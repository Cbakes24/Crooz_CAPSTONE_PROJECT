import AddVehicleForm from './addVehicleForm';

const CreateVehicleForm = () => {
  const vehicle = {
    make: '',
    model: '',
    year: '',
    type: '',
    power: '',
    passengers: '',
    picture: '',
    description: '',
    // price: ''
  };

  return (
    <AddVehicleForm vehicle={vehicle} formType="New vehicle" />
  );
}

export default CreateVehicleForm;
