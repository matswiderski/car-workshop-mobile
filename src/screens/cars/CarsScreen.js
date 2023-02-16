import { FlatList, Text, StyleSheet, View } from "react-native";
import { useAxios } from "../../api/axios";
import { useEffect, useState } from "react";
import {
  Checkbox,
  FAB,
  Modal,
  Portal,
  HelperText,
  TextInput,
  Button,
  Avatar,
  ProgressBar,
} from "react-native-paper";
import { useNotify } from "../../context/NotifyContext";
function CarsScreen({ navigation }) {
  const { privateInstance } = useAxios();
  const { notification, setNotification } = useNotify();
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [visible, setVisible] = useState(false);
  const [actionMode, setActionMode] = useState("");
  const [loading, setLoading] = useState(false);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [carsLoading, setCarsLoading] = useState(false);
  const [licensePlate, setLicensePlate] = useState("");
  const [productionYear, setProductionYear] = useState(0);
  const [licensePlateErrors, setLicensePlateErrors] = useState({
    isOpen: false,
    errors: [],
  });
  const [modelErrors, setModelErrors] = useState({
    isOpen: false,
    errors: [],
  });
  const [brandErrors, setBrandErrors] = useState({
    isOpen: false,
    errors: [],
  });
  const [productionYearErrors, setProductionYearErrors] = useState({
    isOpen: false,
    errors: [],
  });

  const showModal = (mode) => {
    clearErrors();
    setActionMode(mode);
    setVisible(true);
    if (mode === "update") {
      setBrand(selectedRows[0].brand);
      setProductionYear(selectedRows[0].productionYear);
      setLicensePlate(selectedRows[0].licensePlate);
      setModel(selectedRows[0].model);
    }
  };
  const hideModal = () => {
    setActionMode("");
    setVisible(false);
  };

  const rowStyle = (checked) => {
    return {
      flexDirection: "row",
      textAlign: "center",
      backgroundColor: checked ? "rgba(255, 97, 131, 0.15)" : "black",
    };
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setCarsLoading(true);
      (async () => {
        try {
          const response = await privateInstance({
            method: "get",
            url: "car/get-all",
            headers: { "Content-Type": "application/json" },
          });
          console.log(response.data);
          setSelectedRows([]);
          setRows(response.data);
          setCarsLoading(false);
        } catch (error) {
          setCarsLoading(false);
        }
      })();
    });
    return unsubscribe;
  }, [navigation]);

  const generateConfig = (data) => {
    switch (actionMode) {
      case "create":
        return {
          method: "post",
          url: "car/create",
          data: data,
          headers: { "Content-Type": "application/json" },
        };
      case "update":
        return {
          method: "patch",
          url: "car/update",
          data: data,
          headers: { "Content-Type": "application/json" },
        };
      case "delete":
        return {
          method: "post",
          url: "car/delete",
          data: data,
          headers: { "Content-Type": "application/json" },
        };
    }
  };

  const clearErrors = () => {
    setProductionYearErrors({ isOpen: false, errors: [] });
    setBrandErrors({ isOpen: false, errors: [] });
    setModelErrors({ isOpen: false, errors: [] });
    setLicensePlateErrors({ isOpen: false, errors: [] });
  };

  const handleAction = async () => {
    setLoading(true);
    clearErrors();
    let config;
    let carData;
    if (actionMode === "update") {
      carData = {
        id: selectedRows[0].id,
        brand,
        model,
        licensePlate,
        productionYear: productionYear.length === 0 ? 0 : productionYear,
      };
      config = generateConfig(carData);
    } else if (actionMode === "create") {
      carData = {
        brand,
        model,
        licensePlate,
        productionYear: productionYear.length === 0 ? 0 : productionYear,
      };
      config = generateConfig(carData);
    } else {
      config = generateConfig(selectedRows);
    }

    try {
      const response = await privateInstance(config);
      if (actionMode === "update") {
        setRows((prevRows) => {
          return prevRows.map((row) =>
            row.id === carData.id
              ? {
                  id: carData.id,
                  licensePlate: carData.licensePlate,
                  brand: carData.brand,
                  model: carData.model,
                  productionYear: carData.productionYear,
                }
              : row
          );
        });
        setNotification({ visible: true, message: "Car updated successfully" });
      } else if (actionMode === "create") {
        setRows([...rows, response.data]);
        setNotification({ visible: true, message: "Car created successfully" });
      } else {
        setNotification({
          visible: true,
          message: "Cars deleted successfully",
        });
        setRows(
          rows.filter(
            (r) => selectedRows.filter((sr) => sr.id === r.id).length < 1
          )
        );
      }
      setSelectedRows([]);
      hideModal();
    } catch (error) {
      console.log(error.response.data.errors);
      const errors = error.response?.data.errors;
      if (errors !== undefined) {
        if (errors.hasOwnProperty("licensePlate")) {
          setLicensePlateErrors({
            isOpen: true,
            errors: error.response.data.errors.licensePlate,
          });
        }
        if (errors.hasOwnProperty("model")) {
          setModelErrors({
            isOpen: true,
            errors: error.response.data.errors.model,
          });
        }
        if (errors.hasOwnProperty("brand")) {
          setBrandErrors({
            isOpen: true,
            errors: error.response.data.errors.brand,
          });
        }
        if (errors.hasOwnProperty("productionYear")) {
          setProductionYearErrors({
            isOpen: true,
            errors: error.response.data.errors.productionYear,
          });
        }
      }
    }
    setLoading(false);
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <View style={rowStyle(false)}>
          <View style={styles.rowColumn}>
            <Checkbox
              status={selectedRows.length > 0 ? "checked" : "unchecked"}
              color="#ff6384"
              onPress={() => {
                setSelectedRows(
                  selectedRows.length === 0 ? rows.map((row) => row) : []
                );
              }}
            />
          </View>
          <View style={styles.rowColumn}>
            <Text style={styles.headerText}>Brand</Text>
          </View>
          <View style={styles.rowColumn}>
            <Text style={styles.headerText}>Model</Text>
          </View>
          <View style={styles.rowColumn}>
            <Text style={styles.headerText}>License plate</Text>
          </View>
          <View style={styles.rowColumn}>
            <Text style={styles.headerText}>Production year</Text>
          </View>
        </View>
        {rows.length > 0 ? (
          <FlatList
            data={rows}
            style={styles.list}
            renderItem={({ item }) => {
              return (
                <View style={rowStyle(selectedRows.includes(item))}>
                  <View style={styles.rowColumn}>
                    <Checkbox
                      color="#ff6384"
                      status={
                        selectedRows.includes(item) ? "checked" : "unchecked"
                      }
                      onPress={() => {
                        setSelectedRows(
                          selectedRows.includes(item)
                            ? selectedRows.filter((row) => row.id !== item.id)
                            : [...selectedRows, item]
                        );
                      }}
                    />
                  </View>
                  <View style={styles.rowColumn}>
                    <Text style={styles.textItem}>{item.brand}</Text>
                  </View>
                  <View style={styles.rowColumn}>
                    <Text style={styles.textItem}>{item.model}</Text>
                  </View>
                  <View style={styles.rowColumn}>
                    <Text style={styles.textItem}>{item.licensePlate}</Text>
                  </View>
                  <View style={styles.rowColumn}>
                    <Text style={styles.textItem}>{item.productionYear}</Text>
                  </View>
                </View>
              );
            }}
          />
        ) : carsLoading ? (
          <ProgressBar progress={0.5} color="#ff6384" />
        ) : (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar.Icon
              size={36}
              icon="information-outline"
              style={{ backgroundColor: "black" }}
            />
            <Text style={{ color: "white" }}>
              You haven't added any cars yet
            </Text>
          </View>
        )}
      </View>
      <FAB
        icon={selectedRows.length === 0 ? "plus" : "delete"}
        style={styles.fabAdd}
        onPress={() => {
          showModal(selectedRows.length === 0 ? "create" : "delete");
        }}
      />
      {selectedRows.length === 1 && (
        <FAB
          icon="pencil"
          style={styles.fabEdit}
          onPress={() => {
            showModal("update");
          }}
        ></FAB>
      )}

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.containerStyle}
        >
          {actionMode === "delete" ? (
            <View>
              <Text style={styles.textItem}>Delete seleceted cars?</Text>
            </View>
          ) : (
            <>
              <TextInput
                label="License Plate *"
                defaultValue={
                  actionMode === "update" ? selectedRows[0]?.licensePlate : ""
                }
                onChangeText={(value) => setLicensePlate(value)}
              />
              <HelperText
                type="error"
                visible={licensePlateErrors.errors.length > 0}
                style={styles.helperText}
              >
                {licensePlateErrors.errors?.map((msg, i) => {
                  return <Text key={i}>{msg}</Text>;
                })}
              </HelperText>
              <TextInput
                label="Model *"
                defaultValue={
                  actionMode === "update" ? selectedRows[0]?.model : ""
                }
                onChangeText={(value) => setModel(value)}
              />
              <HelperText
                type="error"
                visible={modelErrors.errors.length > 0}
                style={styles.helperText}
              >
                {modelErrors.errors?.map((msg, i) => {
                  return <Text key={i}>{msg}</Text>;
                })}
              </HelperText>
              <TextInput
                label="Brand *"
                defaultValue={
                  actionMode === "update" ? selectedRows[0]?.brand : ""
                }
                onChangeText={(value) => setBrand(value)}
              />
              <HelperText
                type="error"
                visible={brandErrors.errors.length > 0}
                style={styles.helperText}
              >
                {brandErrors.errors?.map((msg, i) => {
                  return <Text key={i}>{msg}</Text>;
                })}
              </HelperText>
              <TextInput
                label="Production Year *"
                defaultValue={
                  actionMode === "update"
                    ? selectedRows[0]?.productionYear.toString()
                    : ""
                }
                onChangeText={(value) =>
                  setProductionYear(value.replace(/[^0-9]/g, 0))
                }
                keyboardType="numeric"
              />
              <HelperText
                type="error"
                visible={productionYearErrors.errors.length > 0}
                style={styles.helperText}
              >
                {productionYearErrors.errors?.map((msg, i) => {
                  return <Text key={i}>{msg}</Text>;
                })}
              </HelperText>
            </>
          )}

          <Button
            buttonColor="#ff6384"
            mode="outlined"
            textColor="black"
            disabled={loading}
            onPress={handleAction}
          >
            {
              {
                create: "Create",
                update: "Update",
                delete: "Delete",
              }[actionMode]
            }
          </Button>
          <Button onPress={hideModal} mode="outlined">
            Cancel
          </Button>
        </Modal>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  fabAdd: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#ff6384",
  },
  fabEdit: {
    position: "absolute",
    margin: 16,
    right: 64,
    bottom: 0,
    backgroundColor: "#FFF689",
  },
  containerStyle: {
    backgroundColor: "#272727",
    padding: 20,
  },
  helperText: {
    marginBottom: 20,
  },
  headerText: {
    paddingVertical: 20,
    color: "#999999",
    fontSize: 10,
  },
  textItem: {
    color: "white",
    paddingVertical: 15,
  },
  rowColumn: {
    justifyContent: "center",
    alignItems: "center",
    width: "20%",
  },
  list: {
    flexGrow: 1,
  },
});

export default CarsScreen;
