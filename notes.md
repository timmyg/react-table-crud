Layout

- App component w/state

  - deleteUsers(email[])
    - delete via api
    - reload all users
  - updateUser(email, field, value)
    - update via api
    - update all users

- UserList component

  - props:
    - user[]

- UserDetail component
  - props:
    - email, name, role

TODOs

- [ ] code components
- [ ] styling
- [ ] setup vercel, w/ env vars
- [ ] deploy with vercel

?

- font family provided doesnt include SF Pro but mockups are all in that font (included .ttf fonts in public folder in case but currently not used)
- hover clickable/cursor?
