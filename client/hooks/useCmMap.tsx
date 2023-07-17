import { LoadScriptNext, useGoogleMap } from '@react-google-maps/api';
import { useContext } from 'react';
import { createContext, FC, PropsWithChildren, useReducer } from 'react';
import { appConfig } from '../../app.config';

export type LatLng = { lat: number; lng: number };
type State = {
  list: Remaining[];
  radius: number;
  weight: number;
  center: LatLng;
  searchPeriod: null | [string, string];
  loading: boolean;
};

export type Remaining = {
  latLng: { lat: number; lng: number };
  address: string;
  count: number;
  name: string;
};

type Action =
  | {
      type: 'SET_LIST';
      list: Remaining[];
    }
  | { type: 'SET_RADIUS'; value: number }
  | { type: 'SET_WEIGHT'; value: number }
  | { type: 'SET_CENTER'; latLng: LatLng }
  | { type: 'SET_LOADING'; value: boolean }
  | { type: 'SET_PERIOD'; period: [string, string] };

type ContextType = {
  state: State;
  dispatch: (action: Action) => void;
};

const CmMapContext = createContext<ContextType>(null as any);

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_LIST':
      return { ...state, list: action.list };
    case 'SET_RADIUS':
      return { ...state, radius: action.value };
    case 'SET_WEIGHT':
      return { ...state, weight: action.value };
    case 'SET_CENTER':
      return { ...state, center: action.latLng };
    case 'SET_LOADING':
      return { ...state, loading: action.value };
    case 'SET_PERIOD':
      return { ...state, searchPeriod: action.period };
    default:
      return state;
  }
};

const initValue: State = {
  list: [],
  radius: appConfig.map.radius,
  weight: appConfig.map.weightMultiple,
  center: { lat: 35.694287, lng: 139.7939672 },
  searchPeriod: null,
  loading: true,
};

export const ContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initValue);
  return (
    <CmMapContext.Provider value={{ state, dispatch }}>
      {children}
    </CmMapContext.Provider>
  );
};

export const useCmMap = () => {
  const { state, dispatch } = useContext(CmMapContext);
  const setPeriod = (period: [string, string]) =>
    dispatch({ type: 'SET_PERIOD', period });
  const setList = (list: Remaining[]) =>
    dispatch({
      type: 'SET_LIST',
      list,
    });
  const setRadius = (value: number) => {
    dispatch({ type: 'SET_RADIUS', value });
  };
  const setWeight = (value: number) => dispatch({ type: 'SET_WEIGHT', value });
  const setCenter = (latLng: LatLng) =>
    dispatch({ type: 'SET_CENTER', latLng });
  return {
    loading: state.loading,
    list: state.list,
    period: state.searchPeriod,
    setList,
    setCenter,
    setPeriod,
    setLoading: (value: boolean) => dispatch({ type: 'SET_LOADING', value }),
    map: {
      center: state.center,
      radius: { value: state.radius, setValue: setRadius },
      weight: { value: state.weight, setValue: setWeight },
    },
  };
};
