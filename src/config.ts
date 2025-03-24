import { StragaDialog, StragaDialogTrigger } from "./components/dialog";

function configureElements() {
	customElements.define("stg-dialog", StragaDialog);
	customElements.define("stg-dialog-trigger", StragaDialogTrigger);
}

export { configureElements };
