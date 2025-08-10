# Database Design: Test_School Competency Platform

This document outlines the MongoDB database schema design for the Test_School Competency Assessment Platform, implemented using Mongoose.

---

## 1. Collections (Schemas)

### 1.1. User Collection (`users`)

Stores information about all users of the platform.

| Field         | Type       | Description                                                 | Constraints / Notes                                             |
| :------------ | :--------- | :---------------------------------------------------------- | :-------------------------------------------------------------- |
| `_id`         | `ObjectId` | Unique identifier for the user.                             | Primary Key, automatically generated.                           |
| `name`        | `String`   | The full name of the user.                                  | Required.                                                       |
| `email`       | `String`   | The user's email address, used for login and communication. | Required, Unique.                                               |
| `password`    | `String`   | The user's hashed password.                                 | Required, stored as a bcrypt hash.                              |
| `role`        | `String`   | The role of the user, determining their permissions.        | Enum: `['Student', 'Admin', 'Supervisor']`, Default: `Student`. |
| `isVerified`  | `Boolean`  | Flag to indicate if the user has verified their email.      | Default: `false`.                                               |
| `failedStep1` | `Boolean`  | Flag to block users who fail the first assessment step.     | Default: `false`.                                               |
| `timestamps`  | `Date`     | `createdAt` and `updatedAt` timestamps.                     | Automatically managed by Mongoose.                              |

### 1.2. Question Collection (`questions`)

Stores all the questions for the competency assessments.

| Field           | Type       | Description                                    | Constraints / Notes                                     |
| :-------------- | :--------- | :--------------------------------------------- | :------------------------------------------------------ |
| `_id`           | `ObjectId` | Unique identifier for the question.            | Primary Key, automatically generated.                   |
| `competency`    | `String`   | The competency area the question belongs to.   | Required.                                               |
| `level`         | `String`   | The difficulty level of the question.          | Enum: `['A1', 'A2', 'B1', 'B2', 'C1', 'C2']`, Required. |
| `questionText`  | `String`   | The text of the question itself.               | Required.                                               |
| `options`       | `[String]` | An array of possible answers for the question. | Required.                                               |
| `correctAnswer` | `String`   | The correct answer from the `options` array.   | Required.                                               |
| `timestamps`    | `Date`     | `createdAt` and `updatedAt` timestamps.        | Automatically managed by Mongoose.                      |

### 1.3. Assessment Collection (`assessments`)

Stores records of each assessment taken by a user.

| Field           | Type       | Description                                             | Constraints / Notes                                         |
| :-------------- | :--------- | :------------------------------------------------------ | :---------------------------------------------------------- |
| `_id`           | `ObjectId` | Unique identifier for the assessment record.            | Primary Key, automatically generated.                       |
| `user`          | `ObjectId` | A reference to the user who took the assessment.        | **Ref: 'User'**, Required.                                  |
| `currentStep`   | `Number`   | The step of the assessment (1, 2, or 3).                | Required.                                                   |
| `status`        | `String`   | The current status of the assessment.                   | Enum: `['InProgress', 'Completed']`, Default: `InProgress`. |
| `score`         | `Number`   | The final percentage score of the completed assessment. | Optional.                                                   |
| `levelAchieved` | `String`   | The certification level achieved in this assessment.    | Optional.                                                   |
| `startTime`     | `Date`     | The timestamp when the assessment was started.          | Required.                                                   |
| `endTime`       | `Date`     | The timestamp when the assessment must be completed by. | Optional, set on start.                                     |
| `timestamps`    | `Date`     | `createdAt` and `updatedAt` timestamps.                 | Automatically managed by Mongoose.                          |

### 1.4. OTP Collection (`otps`)

Stores temporary One-Time Passwords for email verification.

| Field        | Type       | Description                             | Constraints / Notes                   |
| :----------- | :--------- | :-------------------------------------- | :------------------------------------ |
| `_id`        | `ObjectId` | Unique identifier for the OTP record.   | Primary Key, automatically generated. |
| `email`      | `String`   | The email address the OTP was sent to.  | Required.                             |
| `otp`        | `String`   | The 6-digit OTP code.                   | Required.                             |
| `expiresAt`  | `Date`     | The timestamp when the OTP will expire. | Required, has a TTL index.            |
| `timestamps` | `Date`     | `createdAt` and `updatedAt` timestamps. | Automatically managed by Mongoose.    |

### 1.5. PasswordResetToken Collection (`passwordresettokens`)

Stores temporary tokens for the "forgot password" flow.

| Field        | Type       | Description                                   | Constraints / Notes                   |
| :----------- | :--------- | :-------------------------------------------- | :------------------------------------ |
| `_id`        | `ObjectId` | Unique identifier for the token record.       | Primary Key, automatically generated. |
| `user`       | `ObjectId` | A reference to the user requesting the reset. | **Ref: 'User'**, Required.            |
| `token`      | `String`   | The unique, secure token for the reset link.  | Required, Unique.                     |
| `expiresAt`  | `Date`     | The timestamp when the token will expire.     | Required, has a TTL index.            |
| `timestamps` | `Date`     | `createdAt` and `updatedAt` timestamps.       | Automatically managed by Mongoose.    |

---

## 2. Relationships

- **User to Assessment**: A one-to-many relationship. A single user can have multiple assessment records. This is implemented via the `user` field in the `Assessment` schema, which references a `User` document's `_id`.
- **User to PasswordResetToken**: A one-to-one relationship (at any given time). A user can have one active password reset token. This is implemented via the `user` field in the `PasswordResetToken` schema.

---

### How to Create a PDF

You can copy the content of this Markdown file and use an online tool like [md2pdf.com](https://md2pdf.com/) or a local command-line tool like `pandoc` to convert it into a PDF document.
