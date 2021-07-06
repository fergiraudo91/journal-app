import { types } from "../../types/types";

describe("Testing types.js", () => {
  test("should be equal to an object", () => {
    expect(types).toEqual({
      login: "[Auth] Login",
      logout: "[Auth] Logout",

      uiSetErrors: "[UI] Set Errors",
      uiRemoveErrors: "[UI] Remove Errors",

      uiStartingLoading: "[UI] Starting Loading",
      uiFinishLoading: "[UI] Finish Loading",

      notesAddNew: "[Notes] New Note",
      notesActive: "[Notes] Set Active Note",
      notesLoad: "[Notes] Notes Load",
      notesUpdated: "[Notes] Update Notes",
      notesFileURL: "[Notes] Updated Image URL",
      notesDelete: "[Notes] delete note",
      notesLogoutCleaning: "[Notes] Logout Cleaning",
    });
  });
});
