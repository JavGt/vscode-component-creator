import { LANGUAGE_OPTIONS, NOT_CONFIGURED } from "../constants";
import { window } from "vscode";
import { getWorkspaceSettings } from "../helpers";
import { finishProcess } from "../helpers/finish-process";
import { LanguageType } from "../types";

export const selectLanguage = async (): Promise<LanguageType> => {
  const languageDefault = getWorkspaceSettings("lenguaje");

  if (languageDefault !== NOT_CONFIGURED) return languageDefault;

  const response = await window.showQuickPick(
    Object.values(LANGUAGE_OPTIONS).map((language) => ({
      label: language.label,
      detail: language.detail,
      value: language.value,
    })),
    {
      title: "Language",
      placeHolder: "Select the language that your component will have.",
      ignoreFocusOut: true,
    }
  );

  if (!response) finishProcess();

  return response.value as LanguageType;
};
