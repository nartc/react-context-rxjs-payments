import { Descriptions, Divider } from 'antd';
import React, { memo } from 'react';
import { CardElement, Elements, injectStripe } from 'react-stripe-elements';

interface Props {
  amountDue: number;
  onCardComplete: () => void;
}

interface PaymentProps {
  onCardComplete: () => void;
}

const _Payment: React.FC<PaymentProps> = memo(({ onCardComplete }) => (
  <CardElement
    style={{
      base: {
        fontSize: '1rem',
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, monospace',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    }}
    onChange={(event) => {
      if (event.complete) {
        onCardComplete();
      }
    }}
  />
));

const Payment = injectStripe(_Payment);

export const PaymentModalContent: React.FC<Props> = memo(
  ({ amountDue, onCardComplete }) => (
    <>
      <Descriptions>
        <Descriptions.Item span={3} label={'Amount Due'}>
          {amountDue}
        </Descriptions.Item>
      </Descriptions>
      <Divider type={'horizontal'} />
      <Elements>
        <Payment onCardComplete={onCardComplete} />
      </Elements>
    </>
  ),
);
