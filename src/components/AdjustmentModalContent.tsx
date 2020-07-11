import React, { memo } from 'react';
import { Descriptions } from 'antd';

interface Props {
  creditBal: number;
  amountDue: number;
}

export const AdjustmentModalContent: React.FC<Props> = memo(
  ({ amountDue, creditBal }) => {
    return (
      <Descriptions>
        <Descriptions.Item span={3} label={'Credit Balance'}>
          {creditBal}
        </Descriptions.Item>
        <Descriptions.Item span={3} label={'Amount Due'}>
          {amountDue}
        </Descriptions.Item>
      </Descriptions>
    );
  },
);
