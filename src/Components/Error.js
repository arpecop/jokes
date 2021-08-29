import React from 'react';
import { Alert } from 'antd';

const translated = {
  UserNotFoundException: 'потребителя не съществува',
  AuthError: 'потребител и парола не могат да бъдат празни',
  CodeMismatchException: 'невалиден код, моля пробвайте отново',
  NotAuthorizedException: 'потребител или парола невалидни',
  UsernameExistsException: 'потребителя не съществува',
  PasswordNotMatch: 'паролите не пасват',
  InvalidParameterException: 'паролата трябва да е поне 6 символа',
  Empty: '',
};

const Error = (props) => (
  <div>
    {Object.entries(props).map(([err, val]) => val.name !== 'Empty' && (
    <Alert
      description={
          translated[val.name]
            ? translated[val.name]
            : `${val.message}-${val.name}`
        }
      type="error"
    />
    ))}
  </div>
);

export default Error;
