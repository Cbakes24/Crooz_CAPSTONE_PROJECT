import VehicleForm from "./vehicleForm";

const CreateVehicleForm = () => {
  const vehicle = {
    make: "",
    model: "",
    year: "",
    type: "",
    power: "",
    passengers: "",
    picture: "",
    dailyPrice: "",
    description: ""
  };

  return <VehicleForm vehicle={vehicle} formType="New vehicle" />;
};

export default CreateVehicleForm;
