User.create!(
  name: 'System Administrator Name Here',
  email: 'admin@example.com',
  password: 'Admin@1234',
  address: '123 Admin Street, Admin City, Adminland',
  role: :system_admin
)

User.create!(
  name: 'Store Owner Full Name Here',
  email: 'owner@example.com',
  password: 'Owner@1234',
  address: '456 Store Road, Owner City, Shopville',
  role: :store_owner
)

User.create!(
  name: 'Normal User Full Name Sample',
  email: 'user@example.com',
  password: 'User@1234',
  address: '789 User Lane, User Town, Userland',
  role: :normal_user
) 