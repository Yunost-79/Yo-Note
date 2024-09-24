import FloatingShape from './FloatingShapeItem/FloatingShape';

const AuthFloatingShape = () => {
  return (
    <div className="floating_shapes">
      <FloatingShape
        color="#4CAF50"
        size={{ width: '256px', height: '256px' }}
        top="-5%"
        left="10%"
        delay={0}
      />
      <FloatingShape
        color="#10B981"
        size={{ width: '192px', height: '192px' }}
        top="70%"
        left="80%"
        delay={5}
      />
      <FloatingShape
        color="#84CC16"
        size={{ width: '128px', height: '128px' }}
        top="40%"
        left="-10%"
        delay={2}
      />
    </div>
  );
};

export default AuthFloatingShape;
