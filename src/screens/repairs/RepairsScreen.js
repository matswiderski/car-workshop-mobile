import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  Button,
  Avatar,
  Portal,
  Modal,
  ProgressBar,
  TextInput,
} from "react-native-paper";
import Steps from "./Steps";
import { useAxios } from "../../api/axios";
import Repairs from "./Repairs";
import Services from "./Services";
import { useNotify } from "../../context/NotifyContext";
function RepairsScreen({ navigation }) {
  const { privateInstance } = useAxios();
  const { notification, setNotification } = useNotify();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCar, setSelectedCar] = useState({});
  const [selectedWorkshop, setSelectedWorkshop] = useState({});
  const [stepCompleted, setStepCompleted] = useState(false);
  const [cars, setCars] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [repiars, setRepairs] = useState([]);
  const [message, setMessage] = useState("");
  const [services, setServices] = useState([]);
  const [chosenServices, setChosenServices] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      (async () => {
        try {
          setDataLoading(true);
          const getCars = await privateInstance({
            method: "get",
            url: "car/get-all",
            headers: { "Content-Type": "application/json" },
          });
          setCars(getCars.data);

          const getServices = await privateInstance({
            method: "get",
            url: "service/get-all",
            headers: { "Content-Type": "application/json" },
          });
          setServices(getServices.data);
          const getWorkshops = await privateInstance({
            method: "get",
            url: "workshop/get-all",
            headers: { "Content-Type": "application/json" },
          });
          setWorkshops(getWorkshops.data);
          const getRepairs = await privateInstance({
            method: "get",
            url: "repair/get-all",
            headers: { "Content-Type": "application/json" },
          });
          setRepairs(getRepairs.data);
          setDataLoading(false);
        } catch (error) {
          setDataLoading(false);
        }
      })();
    });
    return unsubscribe;
  }, [navigation]);

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
    if (selectedCar.id !== undefined && selectedWorkshop.id !== undefined)
      setStepCompleted(true);
    else setStepCompleted(false);
  };

  const handleBack = () => {
    if (selectedCar.id !== undefined || selectedWorkshop.id !== undefined)
      setStepCompleted(true);
    setCurrentStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async (e) => {
    setDataLoading(true);
    const repair = {
      car: selectedCar,
      workshop: selectedWorkshop,
      services: chosenServices,
      message,
    };
    try {
      const response = await privateInstance({
        method: "post",
        url: "repair/create",
        data: repair,
        headers: { "Content-Type": "application/json" },
      });
      setDataLoading(false);
      setNotification({ visible: true, message: "Repair added successfully" });
      setRepairs([...repiars, response.data]);
      setSelectedWorkshop({});
      setSelectedCar({});
      setCurrentStep(1);
      setStepCompleted(false);
      setMessage("");
      setChosenServices([]);
    } catch (error) {
      console.log(error);
    }
  };

  const rowStyle = (checked) => {
    return {
      flexDirection: "row",
      textAlign: "center",
      justifyContent: "space-between",
      backgroundColor: checked ? "rgba(255, 97, 131, 0.15)" : "black",
    };
  };

  const openHistory = () => {
    setVisible(true);
  };

  const hideHistory = () => {
    setVisible(false);
  };

  return (
    <>
      <Steps currentStep={currentStep} openModal={openHistory} />
      <View style={{ flex: 1, marginBottom: 90 }}>
        {cars.length > 0 ? (
          {
            1: (
              <View>
                <View style={rowStyle(false)}>
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
                <FlatList
                  data={cars}
                  style={styles.list}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity
                        style={rowStyle(selectedCar?.id === item.id)}
                        onPress={() => {
                          setSelectedCar(item);
                          setStepCompleted(true);
                        }}
                      >
                        <View style={styles.rowColumn}>
                          <Text style={styles.textItem}>{item.brand}</Text>
                        </View>
                        <View style={styles.rowColumn}>
                          <Text style={styles.textItem}>{item.model}</Text>
                        </View>
                        <View style={styles.rowColumn}>
                          <Text style={styles.textItem}>
                            {item.licensePlate}
                          </Text>
                        </View>
                        <View style={styles.rowColumn}>
                          <Text style={styles.textItem}>
                            {item.productionYear}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            ),
            2: (
              <>
                <View style={rowStyle(false)}>
                  <View style={styles.rowColumn}>
                    <Text style={styles.headerText}>Name</Text>
                  </View>
                  <View style={styles.rowColumn}>
                    <Text style={styles.headerText}>Latitude</Text>
                  </View>
                  <View style={styles.rowColumn}>
                    <Text style={styles.headerText}>Longitude</Text>
                  </View>
                </View>
                <FlatList
                  data={workshops}
                  style={styles.list}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity
                        style={rowStyle(selectedWorkshop?.id === item.id)}
                        onPress={() => {
                          setSelectedWorkshop(item);
                          setStepCompleted(true);
                        }}
                      >
                        <View style={styles.rowColumn}>
                          <Text style={styles.textItem}>{item.name}</Text>
                        </View>
                        <View style={styles.rowColumn}>
                          <Text style={styles.textItem}>
                            {item.localization.latitude}
                          </Text>
                        </View>
                        <View style={styles.rowColumn}>
                          <Text style={styles.textItem}>
                            {item.localization.longitude}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />
              </>
            ),
            3: (
              <View
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Services
                  services={services}
                  setServices={setServices}
                  chosenServices={chosenServices}
                  setChosenServices={setChosenServices}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                ></View>
                <TextInput
                  placeholder="Optional message to workshop"
                  numberOfLines={6}
                  multiline={true}
                  onChangeText={(msg) => setMessage(msg)}
                  style={{ marginVertical: 15 }}
                />
              </View>
            ),
          }[currentStep]
        ) : dataLoading ? (
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
      <View
        style={{
          flexDirection: "row",
          justifyContent: currentStep >= 2 ? "space-between" : "flex-end",
          marginBottom: 10,
        }}
      >
        {currentStep >= 2 && (
          <Button
            mode="contained"
            onPress={handleBack}
            buttonColor="#333333"
            textColor="#aaaaaa"
            disabled={currentStep === 1}
          >
            Back
          </Button>
        )}
        {currentStep < 3 ? (
          <>
            <Button
              variant="contained"
              buttonColor="#ff6384"
              textColor="black"
              disabled={!stepCompleted}
              onPress={handleNext}
            >
              Next
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="contained"
              buttonColor="#ff6384"
              textColor="black"
              onPress={handleSubmit}
              disabled={dataLoading}
            >
              Submit
            </Button>
          </>
        )}
      </View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideHistory}
          contentContainerStyle={{
            backgroundColor: "black",
            paddingHorizontal: 20,
            flex: 1,
            marginVertical: 50,
          }}
        >
          <Repairs repairs={repiars} />
          <Button
            variant="contained"
            buttonColor="#ff6384"
            textColor="black"
            onPress={hideHistory}
          >
            Close
          </Button>
        </Modal>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  headerText: {
    paddingVertical: 20,
    color: "#999999",
    fontSize: 10,
  },
  rowColumn: {
    justifyContent: "center",
    alignItems: "center",
    width: "25%",
  },
  textItem: {
    color: "white",
    paddingVertical: 15,
  },
});

export default RepairsScreen;
