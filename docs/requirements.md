# Gym Management System - Requirements

## 1. Functional Requirements
### 1.1 Users Management
- There are three types of Users in Gyman: `app-admin`, `tenant-admin` and `member`. 
  - The `app-admin` user is the user that manage the whole tenant and it's purpose is to create new `tenant-admin` users and manage the old ones.
  - The `tenant-admin` user can fully manage it's tenant by creating, removing or updating `member` users and access to all metrics and functionalities related to it's tenant.
  - The `member` user can access it's own profile information. He can see the history of his payments.

### 1.2 Registration Process
- An `app-admin` user can create `tenant-admin` users by using an email, name and last name.
  - The new `tenant-admin` user is going to receive an email with a temporary password and a link to access the platform. At first access he has to set his own personal password When the user change it's password, the `isAccountActive` user field become true.
- A `tenant-admin` can create `member` users by using their email, name and last name.
  - The `member` is going to receive an email with a temporary password
  - At the first access he has to set it's personal password. When the user change it's password, the `isAccountActive` user field become true.
  - After the account activation the user has to be capable of adding all it's personal information like birth day, medical certification and IDs.


### 1.3 Membership & Payments  
- Users with `member` role can see all membership plan availables in the current moment.
- Each `member` user is associated with a *membership*. The *memberships* has to be defined from the `tenant-admin` user in a specific form.
- `tenant-admin` users can associate a `member` user with a membership. When a payment has made the `tenant-admin` user has to fill a form on the user page with the amount of the payment. The field `membership_expiration_date` has to be filled automatically according to the membership duration. 
- The system sends payment reminders via email.

### 1.4 Boards for the users
- `app-admin` user can See all the tenants and manage them by adding or removing `tenant-admin` users.
- `tenant-admin` users type can see all the members of the gym and can edit all the info about the members, can see the total of the income of a specific period, can see how many memberships are active and can see all the tenant's available reports.
- `member` users type can see their information, see the available memberships and see the history of the payments.

