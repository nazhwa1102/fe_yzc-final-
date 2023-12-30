import React from 'react';
import { FormattedNumber } from 'react-intl';

interface PriceProps {
  value: number;
}

const PriceFormatter: React.FC<PriceProps> = ({ value }) => {
  return <FormattedNumber style="currency" currency="IDR" value={value} />;
};

export default PriceFormatter;