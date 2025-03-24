import { afterTransition, getEnsured } from "../utils";

class StragaDialog extends HTMLElement {
	get name() {
		return getEnsured(
			() => this.getAttribute("name"),
			"Straga dialog name not defined.",
		);
	}

	get dialog() {
		return getEnsured(
			() => this.querySelector(`dialog`),
			"Straga dialog not defined.",
		);
	}

	get overlay() {
		return getEnsured(
			() => this.querySelector<HTMLElement>(`[data-dialog=overlay]`),
			"Straga dialog overlay not found.",
		);
	}

	get content() {
		return getEnsured(
			() => this.querySelector<HTMLElement>(`[data-dialog=content]`),
			"Straga dialog content not found.",
		);
	}

	get isOpen() {
		return this.dialog.open;
	}

	connectedCallback() {
		this.addEventListener("click", this.handleClick);

		this.addEventListener("keydown", this.handleKeydown);
	}

	disconnectedCallback() {
		this.removeEventListener("click", this.handleClick);

		this.removeEventListener("keydown", this.handleKeydown);
	}

	show() {
		const dialog = this.dialog;
		const overlay = this.overlay;
		const content = this.content;

		dialog.classList.add("--enter");

		dialog.showModal();

		dialog.classList.add("--entering");

		afterTransition([overlay, content]).then(() => {
			dialog.classList.remove("--enter", "--entering");
		});
	}

	hide() {
		const dialog = this.dialog;
		const overlay = this.overlay;
		const content = this.content;

		dialog.classList.add("--exit");

		dialog.classList.add("--exiting");

		afterTransition([overlay, content]).then(() => {
			dialog.classList.remove("--exit", "--exiting");
			dialog.close();
		});
	}

	private handleClick(event: MouseEvent) {
		if (event.target instanceof HTMLElement) {
			if (
				event.target.getAttribute("data-dialog") === "overlay" ||
				event.target.getAttribute("data-dialog") === "close"
			) {
				this.hide();
			}
		}
	}

	private handleKeydown(event: KeyboardEvent) {
		if (
			event.target instanceof HTMLElement &&
			this.contains(event.target) &&
			event.key === "Escape"
		) {
			event.preventDefault();
			this.hide();
		}
	}
}

class StragaDialogTrigger extends HTMLElement {
	get target() {
		return getEnsured(
			() => this.getAttribute("target"),
			"Straga dialog trigger target not defined.",
		);
	}

	connectedCallback() {
		this.addEventListener("click", this.handleClick);
	}

	disconnectedCallback() {
		this.removeEventListener("click", this.handleClick);
	}

	private handleClick(event: MouseEvent) {
		if (event.target instanceof HTMLElement) {
			if (event.target === this.firstElementChild) {
				const dialog = document.querySelector<StragaDialog>(
					`straga-dialog[name=${this.target}]`,
				);
				if (!dialog || dialog.isOpen) return;

				dialog.show();
			}
		}
	}
}

export { StragaDialog, StragaDialogTrigger };
