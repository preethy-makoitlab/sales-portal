import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class AnyoTranslateService {
    public static default: string = 'en-IN';

    constructor(private translate: TranslateService) {
        this.translate.setDefaultLang(this.current);
    }

    public get current(): string {
        return localStorage.getItem('language') ?? AnyoTranslateService.default;
    }

    public set current(value: string) {
        localStorage.setItem('language', value);
        this.translate.setDefaultLang(value);
    }

    public translateKey(key: string): string {
        return this.translate.instant(key);
    }
}
