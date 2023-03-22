import { useState } from 'react';
import { useDispatch, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createVehicle, updateVehicle } from '../../store/vehicle';

const VehicleForm = ({vehicle}) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const[make, setMake] = useState(vehicle.make);
    const[model, setModel] = useState(vehicle.model);
    const[year, setYear] = useState(vehicle.year);
    const[type, setType] = useState(vehicle.type);
    const[power, setPower] = useState(vehicle.power);
    const[passengers, setPassengers] = useState(vehicle.passengers);
    const[picture, setPicture] = useState(vehicle.picture);
    const[description, setDescription] = useState(vehicle.description);
    const[dailyPrice, setDailyPrice] = useState(vehicle.dailyPrice);


}
