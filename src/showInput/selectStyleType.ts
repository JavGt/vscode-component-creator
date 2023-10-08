import { window } from "vscode";
import { NOT_CONFIGURED } from "../constants";
import { getWorkspaceSettings } from "../helpers";
import { finishProcess } from "../helpers/finish-process";
import { STYLE_OPTIONS } from "../constants/style";
import { StyleType } from "../types";

export const selectStyleType = async (): Promise<StyleType> => {
  const styleTypeDefault = getWorkspaceSettings("typeStyle");

  if (styleTypeDefault !== NOT_CONFIGURED) return styleTypeDefault;

  const response = await window.showQuickPick(
    Object.values(STYLE_OPTIONS).map((style) => ({
      label: style.label,
      detail: style.detail,
      value: style.value,
    })),
    {
      title: "Style type",
      placeHolder: "Select the type of design that your component will have.",
      ignoreFocusOut: true,
    }
  );

  if (!response) finishProcess();

  return response.value as StyleType;
};
