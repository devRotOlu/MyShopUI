import React, { useState } from "react";

import { deliveryContextType, deliveryDataType } from "../../types";

export const deliveryContext = React.createContext({} as deliveryContextType);

const DeliveryProfileProvider = () => {
  const [deliveryProfiles, setDeliveryProfiles] = useState<deliveryDataType[]>([]);
  return <deliveryContext.Provider value={{ deliveryProfiles, setDeliveryProfiles }}></deliveryContext.Provider>;
};

export default DeliveryProfileProvider;
