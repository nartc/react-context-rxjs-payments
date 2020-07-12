import { Modal } from 'antd';
import React, { memo, useState } from 'react';
import { Payment } from '../models/Payment';
import { AdjustmentModalContent } from './AdjustmentModalContent';
import { PaymentModalContent } from './PaymentModalContent';

interface Props {
  payment?: Payment;
  modalType?: 'adjustment' | 'payment';
  onCancel: () => void;
  onSubmit: () => void;
}

export const PaymentsModal: React.FC<Props> = memo(
  ({ payment, modalType, onSubmit, onCancel }) => {
    const [cardComplete, setCardComplete] = useState(false);

    const getModalTitle = () => {
      if (modalType == null) {
        return '';
      }

      return modalType === 'adjustment' ? 'Credit Adjustment' : 'Payment';
    };

    const getOkButtonText = () => {
      if (modalType == null) {
        return '';
      }

      return modalType === 'adjustment' ? 'Apply Credit' : 'Pay';
    };

    const onCardComplete = React.useCallback(() => {
      setCardComplete(true);
    }, []);

    return (
      <Modal
        title={getModalTitle()}
        visible={modalType != null}
        onCancel={onCancel}
        onOk={onSubmit}
        okText={getOkButtonText()}
        okButtonProps={{
          disabled: modalType === 'payment' ? !cardComplete : false,
        }}
      >
        {modalType === 'adjustment' ? (
          <AdjustmentModalContent
            amountDue={payment?.amountDue ?? 0}
            creditBal={payment?.creditBal ?? 0}
          />
        ) : modalType === 'payment' ? (
          <PaymentModalContent
            amountDue={payment?.amountDue ?? 0}
            onCardComplete={onCardComplete}
          />
        ) : null}
      </Modal>
    );
  },
);
