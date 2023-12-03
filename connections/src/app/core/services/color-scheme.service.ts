/* eslint-disable no-underscore-dangle */
import { Injectable, Renderer2, RendererFactory2 } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class ColorSchemeService {
    private renderer: Renderer2;
    private colorScheme!: string;
    private colorSchemePrefix = "color-scheme-";

    constructor(rendererFactory: RendererFactory2) {
        this.renderer = rendererFactory.createRenderer(null, null);
    }

    _detectPrefersColorScheme() {
        if (window.matchMedia("(prefers-color-scheme)").media !== "not all") {
            this.colorScheme = window.matchMedia(
                "(prefers-color-scheme: light)"
            ).matches
                ? "dark"
                : "light";
        } else {
            this.colorScheme = "dark";
        }
    }

    _setColorScheme(scheme: string) {
        this.colorScheme = scheme;
        localStorage.setItem("prefers-color", scheme);
    }

    _getColorScheme() {
        const localStorageColorScheme = localStorage.getItem("prefers-color");
        if (localStorageColorScheme) {
            this.colorScheme = localStorageColorScheme;
        } else {
            this._detectPrefersColorScheme();
        }
    }

    load() {
        this._getColorScheme();
        this.renderer.addClass(
            document.body,
            this.colorSchemePrefix + this.colorScheme
        );
    }

    update(scheme: string) {
        this._setColorScheme(scheme);
        this.renderer.removeClass(
            document.body,
            // eslint-disable-next-line operator-linebreak
            this.colorSchemePrefix +
                (this.colorScheme === "dark" ? "light" : "dark")
        );
        this.renderer.addClass(document.body, this.colorSchemePrefix + scheme);
    }

    currentActive() {
        return this.colorScheme;
    }
}
