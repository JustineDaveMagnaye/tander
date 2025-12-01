import ProgressBar from "@/src/components/ui/ProgressBar";
import { getErrorString } from "@/src/utility/helpers";
import { useFormikContext } from "formik";
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Step1Nav } from "@/src/navigation/NavigationTypes";
import { useSlideUp, useStaggerAnimation } from "../../hooks/useFadeIn";
import SelectField from "../../components/forms/SelectField";
import TextInputField from "../../components/forms/TextInputField";

interface Props {
  navigation: Step1Nav;
}

export default function Step1BasicInfo({ navigation }: Props) {
  const {
    values,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    validateForm,
    setTouched,
  } = useFormikContext<any>();

  // Animations
  const headerAnim = useSlideUp(500, 0, 30);
  const cardAnim = useSlideUp(600, 100, 40);
  const buttonAnim = useSlideUp(600, 200, 30);

  const handleNext = async () => {
    const validationErrors = await validateForm();

    if (Object.keys(validationErrors).length === 0) {
      return navigation.navigate("Step2");
    }

    setTouched({
      firstName: true,
      lastName: true,
      nickName: true,
      birthday: true,
      age: true,
      country: true,
      civilStatus: true,
      city: true,
      hobby: true,
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 50 }}
      showsVerticalScrollIndicator={false}
    >
      <ProgressBar step={1} total={3} />

      {/* ANIMATED HEADER & LOGO */}
      <Animated.View
        style={[
          styles.header,
          {
            opacity: headerAnim.opacity,
            transform: [{ translateY: headerAnim.translateY }],
          },
        ]}
      >
        <Image
          source={require("../../assets/icons/tander-logo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Welcome to Tander</Text>
        <Text style={styles.subtitle}>
          Please complete this registration to join Tander, Social, Connect,
          Companionship & Dating.
        </Text>
      </Animated.View>

      {/* ANIMATED BASIC INFO CARD */}
      <Animated.View
        style={[
          styles.card,
          {
            opacity: cardAnim.opacity,
            transform: [{ translateY: cardAnim.translateY }],
          },
        ]}
      >
        <Text style={styles.cardTitle}>Basic Info</Text>

        {/* FIRST NAME */}
        <TextInputField
          label="First Name"
          value={values.firstName}
          touched={!!touched.firstName}
          error={getErrorString(errors.firstName)}
          onChangeText={(t) => setFieldValue("firstName", t)}
          onBlur={() => setFieldTouched("firstName", true)}
        />

        {/* LAST NAME */}
        <TextInputField
          label="Last Name"
          value={values.lastName}
          touched={!!touched.lastName}
          error={getErrorString(errors.lastName)}
          onChangeText={(t) => setFieldValue("lastName", t)}
          onBlur={() => setFieldTouched("lastName", true)}
        />

        {/* NICKNAME */}
        <TextInputField
          label="Nick Name"
          value={values.nickName}
          touched={!!touched.nickName}
          error={getErrorString(errors.nickName)}
          onChangeText={(t) => setFieldValue("nickName", t)}
          onBlur={() => setFieldTouched("nickName", true)}
        />

        {/* BIRTHDAY + AGE (2-column layout) */}
        <View style={styles.row}>
          <View style={styles.col}>
            <TextInputField
              label="Birthday"
              placeholder="MM/DD/YYYY"
              value={values.birthday}
              touched={!!touched.birthday}
              error={getErrorString(errors.birthday)}
              onChangeText={(t) => setFieldValue("birthday", t)}
              onBlur={() => setFieldTouched("birthday", true)}
            />
          </View>

          <View style={styles.col}>
            <TextInputField
              label="Age"
              value={values.age}
              touched={!!touched.age}
              error={getErrorString(errors.age)}
              keyboardType="numeric"
              onChangeText={(t) => setFieldValue("age", t)}
              onBlur={() => setFieldTouched("age", true)}
            />
          </View>
        </View>

        {/* COUNTRY + CIVIL STATUS */}
        <View style={styles.row}>
          <View style={styles.col}>
            <SelectField
              label="Country"
              placeholder="Select..."
              value={values.country}
              touched={!!touched.country}
              error={getErrorString(errors.country)}
              onPress={() => console.log("Open Country Picker")}
            />
          </View>

          <View style={styles.col}>
            <SelectField
              label="Civil Status"
              placeholder="Select status"
              value={values.civilStatus}
              touched={!!touched.civilStatus}
              error={getErrorString(errors.civilStatus)}
              onPress={() => console.log("Open Civil Status Picker")}
            />
          </View>
        </View>

        {/* CITY + HOBBY */}
        <View style={styles.row}>
          <View style={styles.col}>
            <SelectField
              label="City/Province"
              placeholder="Select..."
              value={values.city}
              touched={!!touched.city}
              error={getErrorString(errors.city)}
              onPress={() => console.log("Open City Picker")}
            />
          </View>

          <View style={styles.col}>
            <SelectField
              label="Hobby"
              placeholder="Select hobby"
              value={values.hobby}
              touched={!!touched.hobby}
              error={getErrorString(errors.hobby)}
              onPress={() => console.log("Open Hobby Picker")}
            />
          </View>
        </View>
      </Animated.View>

      {/* ANIMATED NEXT BUTTON */}
      <Animated.View
        style={{
          opacity: buttonAnim.opacity,
          transform: [{ translateY: buttonAnim.translateY }],
        }}
      >
        <TouchableOpacity
          style={styles.nextBtn}
          onPress={handleNext}
          activeOpacity={0.85}
        >
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#F9F9F9" },

  header: { alignItems: "center", marginBottom: 20 },
  logo: { width: 56, height: 56, marginBottom: 10 },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 6 },
  subtitle: {
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
    width: "90%",
  },

  card: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    marginBottom: 30,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },

  col: {
    flex: 1,
  },

  nextBtn: {
    backgroundColor: "#F5A14B",
    padding: 18,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#F5A14B",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },

  nextText: { color: "#FFF", fontSize: 16, fontWeight: "700" },
});
