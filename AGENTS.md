# Agent Instructions - FullIT Admin Panel

These are the rules for managing the FullIT application.

## Admin Panel Capabilities

The application has an admin panel that allows authorized administrators (specifically assigned UIDs) to perform the following actions:

1.  **User Roles:** Change user roles between 'student' and 'admin'.
2.  **XP/Scores:** Update user total scores (XP).
3.  **Progress Reset:** Reset a user's completed tasks (progress).
4.  **User Management:** Delete user accounts.

## Security & Maintenance Rules

- **Access Guard:** Admin actions are secured at the Firestore level. Ensure `firestore.rules` remains updated and deployed whenever admin actions are modified.
- **Verification:** Always verify if admin actions, especially destructive ones (delete, reset), are behind a user confirmation (e.g., `confirm()` dialogue) before triggering the Firebase service call.
- **Communication:** When updating admin tools, document changes clearly in `metadata.json` and persist rules here.
