import { Button, Result, Spin, Skeleton } from 'antd';
import React, { memo } from 'react';

interface Props {
  loading: boolean;
  retryEnabled: boolean;
  error?: string;
  onRetry?: () => void;
}

export const LoadingContainer: React.FC<Props> = memo(
  ({ children, error, loading, retryEnabled, onRetry }) => {
    return (
      <Spin spinning={loading} tip={'Loading...'}>
        {!!error ? (
          <Result
            status={'error'}
            title={'Error'}
            subTitle={error}
            extra={
              retryEnabled && onRetry
                ? [
                    <Button type={'primary'} onClick={onRetry}>
                      Retry
                    </Button>,
                  ]
                : null
            }
          />
        ) : loading ? (
          <Skeleton />
        ) : (
          children
        )}
      </Spin>
    );
  },
);

LoadingContainer.defaultProps = {
  error: '',
};
