import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';
import { fetchVehicle } from '../../store/vehicle';
