import { ReactNode, useState } from 'react';
import { mockUser } from '../../types/context';
import { UserRoleContext } from '../../context/UserRoleContext';
import { UserNoPassword } from '../../types/user/user';

export const UserRoleProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setNewUser] = useState<UserNoPassword>(mockUser);

  const setUser = (newRole: string) => {
    setNewUser({
      ...user,
      role: newRole,
    });
  };

  return (
    <UserRoleContext.Provider value={{ user, setUser }}>
      {children}
    </UserRoleContext.Provider>
  );
};
