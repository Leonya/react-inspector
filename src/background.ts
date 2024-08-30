const getCurrentTab = async () => {
  const queryOptions = { active: true, currentWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);
  return tab;
};

const sendInspectSignal = async (msg: string, tabId?: number) => {
  const target = tabId || (await getCurrentTab()).id || 0;
  await chrome.tabs.sendMessage(target, msg);
};

const reactInspectorMenuItemId = "react-inspector";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: reactInspectorMenuItemId,
    title: "Inspect with React Inspector",
    contexts: ["all"],
  });
});

chrome.commands.onCommand.addListener((command) => {
  if (command === "inspect") {
    sendInspectSignal("inspect");
  }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === reactInspectorMenuItemId) {
    sendInspectSignal("inspect", tab?.id);
  }
});

chrome.action.onClicked.addListener((tab) => {
  sendInspectSignal("inspect", tab.id);
});

export {};
