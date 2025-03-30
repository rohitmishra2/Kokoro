import React, { useCallback, useState } from "react";
import {
  Alert,
  Image,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Linking,
  Keyboard,
  Platform,
  useWindowDimensions,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useChatbot } from "../../contexts/ChatbotContext";
import SideBarNavigation from "../../components/SideBarNavigation";
import Header from "../../components/Header";

const DoctorsInfoWithRating = ({ navigation, route, data }) => {
  const { width } = useWindowDimensions();
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { setChatbotConfig } = useChatbot();
  const [selectedDate, setSelectedDate] = useState("Today");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const doctors = route.params?.doctors || {}; // Get doctor data from navigation

  const handleSearch = () => {
    Alert.alert(`Search Results for: ${searchQuery}`);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time) => {
    setSelectedTimeSlot(time);
  };

  // Function to handle redirection for booking
  const handleBooking = (timeSlot, doctorData, clinicData) => {
    setSelectedTimeSlot(timeSlot);
    // Navigate to a payment page passing the data through the route params
    navigation.navigate(
      "DoctorsPaymentScreen"
      //EXAMPLE OF HOW TO PASS DATA AS A ROUTE PARAM
      // , {
      // doctorName: doctorData.name,
      // doctorCredentials: doctorData.credentials,
      // clinicName: clinicData.name,
      // date: selectedDate,
      // timeSlot: timeSlot,
      // fee: clinicData.fee,
      // }
    );
  };

  const doctorData = {
    name: "Dr Kislay Shrivasatva",
    credentials: "MD,MS",
    experience: "22 Years Experience",
    rating: 4.5,
    profileImage: require("../../assets/Images/dr_kislay.jpg"),
    bio: "Dr Kislay Shrivasatva, MD (Cardiology), is a seasoned cardiologist with over 22 years of experience in treating heart conditions. Based in Bhopal, he specializes in coronary artery diseases, hypertension, heart failure, arrhythmias, and preventive cardiology. Dr Shrivasatva is skilled in interventional procedures such as angioplasty, CABG, valve repairs, and angiographies. After completing his MBBS and MD in Cardiology from top medical institutions, he developed expertise in both surgical and non-surgical heart care. Known for his comprehensive approach, he emphasizes heart disease detection, prevention, and lifestyle modifications. He is an active member of leading cardiology associations.",
    reviews: [
      { id: 1, rating: 5, text: "Very good Doctor", reviewer: "Mr Donald" },
      { id: 2, rating: 5, text: "Very good Doctor", reviewer: "Mr Donald" },
      { id: 3, rating: 5, text: "Very good Doctor", reviewer: "Mr Donald" },
    ],
  };

  const clinicData = {
    name: "Wisdom Clinics",
    fee: "₹800 fee",
    waitTime: "Max 15 min wait",
    layout: "Hsr Layout",
  };

  const availableDates = [
    { id: "today", label: "Today", slotsAvailable: 0 },
    { id: "tomorrow", label: "Tomorrow", slotsAvailable: 2 },
    { id: "dayAfter", label: "Mon, 2 feb", slotsAvailable: 2 },
  ];

  const timeSlots = {
    morning: { label: "Morning (1 slot)", slots: ["10:30 AM"] },
    afternoon: { label: "Afternoon (1 slot)", slots: ["12:30 PM"] },
  };

  const handleBookAppointment = () => {
    navigation.navigate("AppDoctorsRating");
  }

  return (
    <>
      {Platform.OS === "web" && width > 1000 && (
        <View style={styles.webContainer}>
          <View style={styles.imageContainer}>
            <ImageBackground
              source={require("../../assets/Images/MedicineBackground.png")}
              style={styles.imageBackground}
            >
              <View
                style={[
                  styles.overlay,
                  { backgroundColor: "rgba(16, 16, 16, 0.3)" },
                ]}
              />

              <View style={styles.parent}>
                {/* Keeping the existing sidebar navigation as requested */}
                <View style={styles.Left}>
                  <SideBarNavigation navigation={navigation} />
                </View>

                <View style={styles.Right}>
                  <View style={styles.header}>
                    <Header navigation={navigation} />
                  </View>

                  <View style={styles.contentContainer}>
                    {/* Doctor profile card */}
                    <View style={styles.doctorProfileCard}>
                      <View style={styles.doctorLeftSection}>
                        <Image
                          source={doctorData.profileImage}
                          style={styles.doctorImage}
                        />
                        <View style={styles.ratingContainer}>
                          <MaterialIcons
                            name="star"
                            size={20}
                            color="#FFD700"
                          />
                          <Text style={styles.ratingText}>
                            {doctorData.rating}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.doctorInfoSection}>
                        <Text style={styles.doctorName}>{doctorData.name}</Text>
                        <Text style={styles.doctorCredentials}>
                          {doctorData.credentials}
                        </Text>
                        <Text style={styles.doctorExperience}>
                          {doctorData.experience}
                        </Text>
                        <Text style={styles.doctorBio}>{doctorData.bio}</Text>

                        <View style={styles.reviewsSection}>
                          <Text style={styles.reviewsTitle}>User Reviews</Text>
                          <View style={styles.reviewsList}>
                            {doctorData.reviews.map((review) => (
                              <View key={review.id} style={styles.reviewCard}>
                                <Text style={styles.reviewText}>
                                  {review.text}
                                </Text>
                                <View style={styles.reviewerContainer}>
                                  <MaterialIcons
                                    name="star"
                                    size={16}
                                    color="#FFD700"
                                  />
                                  <MaterialIcons
                                    name="star"
                                    size={16}
                                    color="#FFD700"
                                  />
                                  <MaterialIcons
                                    name="star"
                                    size={16}
                                    color="#FFD700"
                                  />
                                  <MaterialIcons
                                    name="star"
                                    size={16}
                                    color="#FFD700"
                                  />
                                  <MaterialIcons
                                    name="star"
                                    size={16}
                                    color="#FFD700"
                                  />
                                  <Text style={styles.reviewerName}>
                                    {review.reviewer}
                                  </Text>
                                </View>
                              </View>
                            ))}
                          </View>
                        </View>
                      </View>
                    </View>

                    {/* Appointment booking section */}
                    <View style={styles.appointmentSection}>
                      <View style={styles.appointmentHeader}>
                        <Text style={styles.appointmentTitle}>
                          Clinic Appointment
                        </Text>
                        <Text style={styles.appointmentFee}>
                          {clinicData.fee}
                        </Text>
                      </View>

                      <View style={styles.clinicDetails}>
                        <Text style={styles.clinicName}>{clinicData.name}</Text>
                        <Text style={styles.clinicWaitTime}>
                          {clinicData.waitTime}
                        </Text>
                        <Text style={styles.clinicLocation}>
                          {clinicData.layout}
                        </Text>
                      </View>

                      <View style={styles.dateSelector}>
                        {availableDates.map((date) => (
                          <TouchableOpacity
                            key={date.id}
                            style={[
                              styles.dateOption,
                              selectedDate === date.label &&
                                styles.selectedDate,
                            ]}
                            onPress={() => handleDateSelect(date.label)}
                          >
                            <Text style={styles.dateLabel}>{date.label}</Text>
                            <Text style={styles.slotsAvailable}>
                              {date.slotsAvailable > 0
                                ? `${date.slotsAvailable} slots Available`
                                : "No slot today"}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>

                      <View style={styles.timeSlotSection}>
                        <View style={styles.timeSlotsGroup}>
                          <Text style={styles.timeGroupLabel}>
                            {timeSlots.morning.label}
                          </Text>
                          <View style={styles.timeSlotsContainer}>
                            {timeSlots.morning.slots.map((time) => (
                              <TouchableOpacity
                                key={time}
                                style={[
                                  styles.timeSlot,
                                  selectedTimeSlot === time &&
                                    styles.selectedTimeSlot,
                                ]}
                                onPress={() =>
                                  handleBooking(time, doctorData, clinicData)
                                }
                              >
                                <Text style={styles.timeSlotText}>{time}</Text>
                                <Text style={styles.bookNowText}>Book Now</Text>
                              </TouchableOpacity>
                            ))}
                          </View>
                        </View>

                        <View style={styles.timeSlotsGroup}>
                          <Text style={styles.timeGroupLabel}>
                            {timeSlots.afternoon.label}
                          </Text>
                          <View style={styles.timeSlotsContainer}>
                            {timeSlots.afternoon.slots.map((time) => (
                              <TouchableOpacity
                                key={time}
                                style={[
                                  styles.timeSlot,
                                  selectedTimeSlot === time &&
                                    styles.selectedTimeSlot,
                                ]}
                                onPress={() =>
                                  handleBooking(time, doctorData, clinicData)
                                }
                              >
                                <Text style={styles.timeSlotText}>{time}</Text>
                                <Text style={styles.bookNowText}>Book Now</Text>
                              </TouchableOpacity>
                            ))}
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
        </View>
      )}
      {(Platform.OS !== "web" || width < 1000) && (
        <View style={styles.appContainer}>
          <View style={{ flex: 1 }}>
            <View style={styles.imageContainer}>
              <Image source={doctors.image} style={styles.doctorImage} />
              <Text style={styles.doctorName}>{doctors.name}</Text>
              <Text style={styles.doctorCredentials}>
                ({doctors.credential})
              </Text>
            </View>

            <View style={styles.experienceRatingContainer}>
              <View style={styles.experienceSection}>
                <Image
                  source={require("../../assets/Icons/doctorTool.png")}
                  style={styles.doctorIcon}
                />
                <View style={styles.experienceDetail}>
                  <Text style={styles.experienceText}>Total Experience</Text>
                  <Text style={styles.experience}>{doctors.experience}</Text>
                </View>
              </View>
              <View style={styles.verticalLine} />
              <View style={styles.ratingSection}>
                <Image
                  source={require("../../assets/Icons/Star.png")}
                  style={styles.doctorIcon}
                />
                <TouchableOpacity style={styles.ratingDetail}>
                  <Text style={styles.ratingText}>Rating & Reviews</Text>
                  <Text style={styles.rating}>{doctors.ratingreview}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.consultationFess}>
              <View style={styles.iconBox}>
                <Image
                  source={require("../../assets/Icons/dollarIcon.png")}
                  style={styles.dollarIcon}
                />
              </View>
              <View style={styles.feesBox}>
                <Text style={styles.fees}>{doctors.consultationFees}</Text>
                <Text style={styles.feesText}>Consultation fees</Text>
              </View>
            </View>
            <View style={styles.availabilityContainer}>
              <Text style={styles.availabilityTimeText}>Available Time</Text>
              <View style={styles.availabilityShowBox}>
                <View style={styles.availabilityBox}>
                  {/* Today */}
                  <View style={styles.dayColumn}>
                    <Text style={styles.dayTitle}>Today</Text>
                    <Text style={styles.noSlots}>
                      {doctors.availability.today.slotsAvailable > 0
                        ? `${doctors.availability.today.slotsAvailable} slots Available`
                        : "No slot today"}
                    </Text>
                  </View>

                  {/* Tomorrow */}
                  <View style={styles.dayColumn}>
                    <Text style={styles.dayTitle}>Tomorrow</Text>
                    <Text style={styles.slotsAvailable}>
                      {doctors.availability.tomorrow.slotsAvailable} slots
                      Available
                    </Text>
                  </View>

                  {/* Monday */}
                  <View style={styles.dayColumn}>
                    <Text style={styles.dayTitle}>Mon, 2 Feb</Text>
                    <Text style={styles.slotsAvailable}>
                      {doctors.availability.monday.slotsAvailable} slots
                      Available
                    </Text>
                  </View>
                </View>

                {/* Time Slots */}
                <View style={styles.timeSlotContainer}>
                  <Text style={styles.slotHeading}>Morning</Text>
                  <TouchableOpacity style={styles.slotButton}>
                    <Text style={styles.slotText}>
                      {doctors.availability.tomorrow.slots[0]}
                    </Text>
                  </TouchableOpacity>

                  <Text style={styles.slotHeading}>Afternoon (1 slot)</Text>
                  <TouchableOpacity style={styles.slotButton}>
                    <Text style={styles.slotText}>
                      {doctors.availability.tomorrow.slots[1]}
                    </Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.viewAllButton}>
                <Text style={styles.viewAllText}>View All Availability →</Text>
              </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={styles.bookAppointmentButton} onPress={handleBookAppointment}>
              <Text style={styles.bookAppointmentText}>Book Appointment</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
    flexDirection: "row",
    height: "100%",
    width: "100%",
  },
  appContainer: {
    flex: 1,
    height: "100%",
    width: "100%",
    flexDirection: "column",
  },

  imageContainer: {
    height: "17%",
    width: "75%",
    //borderWidth: 1,
    marginVertical: "15%",
    marginBottom: "5%",
    alignSelf: "center",
    ...Platform.select({
      web: {
        height: "100%",
        width: "100%",
        marginBottom: "15%",
      },
    }),
  },
  experienceRatingContainer: {
    height: "7%",
    width: "88%",
    //borderWidth: 1,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 5,
    boxShadow: " 0px 0px 4px 3px rgba(0, 0, 0, 0.25)",
    backgroundColor: "rgba(255, 252, 252, 1)",
    padding: "2%",
  },
  experienceSection: {
    height: "100%",
    width: "49%",
    //borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  doctorIcon: {
    alignSelf: "center",
    height: 28,
    width: 28,
    marginHorizontal: "3%",
  },
  experienceDetail: {
    height: "94%",
    width: "78%",
    //borderWidth: 1,
    alignSelf: "center",
    flexDirection: "column",
  },
  experienceText: {
    fontSize: 14,
    fontWeight: 600,
    color: " rgb(94, 93, 93)",
    paddingHorizontal: "4%",
  },
  experience: {
    fontSize: 14,
    fontWeight: 600,
    color: "#000000",
    paddingHorizontal: "4%",
  },
  verticalLine: {
    height: "75%",
    width: "0.4%",
    //borderWidth:1,
    alignSelf: "center",
    backgroundColor: "#000000",
  },
  ratingSection: {
    height: "100%",
    width: "48.8%",
    //borderWidth: 1,
    flexDirection: "row",
  },
  rating: {
    fontSize: 14,
    fontWeight: 600,
    color: "#000000",
    alignSelf: "center",
  },
  consultationFess: {
    height: "7%",
    width: "88%",
    //borderWidth:1,
    alignSelf: "center",
    marginVertical: "2.5%",
    borderRadius: 5,
    boxShadow: " 0px 0px 4px 3px rgba(0, 0, 0, 0.25)",
    backgroundColor: "rgba(255, 252, 252, 1)",
    flexDirection: "row",
    paddingHorizontal: "2%",
  },
  iconBox: {
    height: "52%",
    width: "9%",
    //borderWidth: 1,
    alignSelf: "center",
    borderRadius: 40,
    backgroundColor: "#D9D9D9",
  },
  dollarIcon: {
    height: 20,
    width: 11,
    alignSelf: "center",
    marginVertical: "16%",
  },
  feesBox: {
    height: "90%",
    width: "60%",
    //borderWidth: 1,
    marginHorizontal: "3.5%",
    alignSelf: "center",
    flexDirection: "column",
  },
  fees: {
    fontSize: 16,
    fontWeight: 600,
    color: "#000000",
    paddingVertical: "1%",
  },
  feesText: {
    fontSize: 14,
    fontWeight: 600,
    color: " rgb(94, 93, 93)",
  },
  availabilityContainer: {
    height: "40%",
    width: "88%",
    //borderWidth: 1,
    alignSelf: "center",
    marginVertical: "8%",
  },
  availabilityTimeText: {
    fontSize: 13,
    fontWeight: 600,
    color: "#444444",
    paddingHorizontal: "2%",
  },
  availabilityShowBox: {
    height: "90%",
    width: "98%",
    //borderWidth:1,
    alignSelf: "center",
    borderRadius: 15,
    boxShadow: " 0px 0px 4px 1px rgba(0, 0, 0, 0.25)",
    marginVertical: "2%",
    paddingTop: "3%",
    paddingHorizontal: "2%",
    flexDirection: "column",
  },
  availabilityBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    //borderWidth:1
  },

  dayColumn: {
    alignItems: "center",
  },

  dayTitle: {
    fontWeight: "bold",
    fontSize: 14,
  },

  noSlots: {
    color: "gray",
    fontSize: 12,
  },

  slotsAvailable: {
    color: "green",
    fontSize: 12,
  },

  timeSlotContainer: {
    marginTop: "2%",
    flexDirection:"column",
    //borderWidth:1,
    height:"57%",
    justifyContent:"space-between"
  },

  slotHeading: {
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 10,
  },

  slotButton: {
    backgroundColor: "#E0EBFF",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: "flex-start",
    marginTop: 5,
  },

  slotText: {
    color: "#3366CC",
    fontSize: 14,
  },

  viewAllButton: {
    backgroundColor: "rgb(243, 119, 119)",
    paddingVertical: "2%",
    marginTop: "5%",
    alignItems: "center",
    borderRadius:8,
    width:"85%",
    alignSelf:"center"
  },

  viewAllText: {
    color: "#fff",
    fontWeight: "bold",
  },
  bookAppointmentButton: {
    height: "5%",
    width: "70%",
    //borderWidth: 1,
    alignSelf: "center",
    borderRadius: 8,
    backgroundColor: "rgb(243, 119, 119)",
    marginVertical: "1%",
  },
  bookAppointmentText: {
    alignSelf: "center",
    paddingVertical: "3.5%",
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: 600,
  },
  imageBackground: {
    flex: 1,
    height: "100%",
    width: "100%",
    borderWidth: 1,
    opacity: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  parent: {
    flexDirection: "row",
    height: "100%",
    width: "100%",
  },
  Left: {
    height: "100%",
    width: "15%",
    backgroundColor: "#f5f5f5",
  },
  Right: {
    height: "100%",
    width: "85%",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    // borderWidth: 5,
    // borderColor: "black",
    zIndex: 2,
    ...Platform.select({
      web:{
        width:"100%",
        marginBottom: 20,
      }
    })
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "rgba(138, 112, 255, 0.8)",
    marginBottom: "10%",
    borderRadius: 20,
    overflow: "hidden",
  },
  doctorProfileCard: {
    width: "60%",
    height: "80%",
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    margin: 10,
  },
  doctorLeftSection: {
    width: "20%",
    alignItems: "center",
  },
  doctorImage: {
    height: 90,
    width: 90,
    alignSelf: "center",
    borderRadius: 40,
    ...Platform.select({
      web: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
      },
    }),
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 600,
    color: " rgb(94, 93, 93)",
    paddingHorizontal: "4%",
    ...Platform.select({
      web: {
        marginLeft: 5,
        fontSize: 16,
        fontWeight: "bold",
      },
    }),
  },
  doctorInfoSection: {
    width: "80%",
    paddingLeft: 20,
  },
  doctorName: {
    fontSize: 22,
    fontWeight: 600,
    color: "#000000",
    alignSelf: "center",
    ...Platform.select({
      web: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#333",
      },
    }),
  },
  doctorCredentials: {
    fontSize: 14,
    alignSelf: "center",
    fontWeight: 600,
    ...Platform.select({
      web: {
        fontSize: 14,
        color: "#666",
        marginTop: 2,
      },
    }),
  },
  doctorExperience: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
    marginBottom: 10,
  },
  doctorBio: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
    marginBottom: 15,
  },
  reviewsSection: {
    marginTop: 10,
  },
  reviewsTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  reviewsList: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  reviewCard: {
    width: "30%",
    backgroundColor: "#ffebee",
    borderRadius: 10,
    padding: 10,
  },
  reviewText: {
    fontSize: 12,
    color: "#333",
    marginBottom: 5,
  },
  reviewerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  reviewerName: {
    fontSize: 10,
    color: "#666",
    marginLeft: 5,
  },
  appointmentSection: {
    width: "35%",
    backgroundColor: "#fff",
    borderRadius: 20,
    margin: 10,
    padding: 20,
  },
  appointmentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  appointmentTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff7072",
  },
  appointmentFee: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff7072",
  },
  clinicDetails: {
    marginBottom: 20,
  },
  clinicName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  clinicWaitTime: {
    fontSize: 14,
    color: "#666",
    marginTop: 3,
  },
  clinicLocation: {
    fontSize: 14,
    color: "#666",
    marginTop: 3,
  },
  dateSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  dateOption: {
    width: "30%",
    padding: 10,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  selectedDate: {
    borderBottomColor: "#ff7072",
  },
  dateLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  slotsAvailable: {
    fontSize: 12,
    color: "#388e3c",
    marginTop: 5,
  },
  timeSlotSection: {
    marginTop: 10,
  },
  timeSlotsGroup: {
    marginBottom: 20,
  },
  timeGroupLabel: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  timeSlotsContainer: {
    flexDirection: "row",
  },
  timeSlot: {
    backgroundColor: "#f5f5f5",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  selectedTimeSlot: {
    backgroundColor: "#e0f2f1",
    borderWidth: 1,
    borderColor: "#80cbc4",
  },
  timeSlotText: {
    fontSize: 14,
    color: "#333",
  },
});

export default DoctorsInfoWithRating;
