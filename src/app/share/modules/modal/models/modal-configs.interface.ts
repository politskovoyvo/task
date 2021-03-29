import { ElementRef, TemplateRef, Type } from '@angular/core';

export interface IModalConfigs<T = any> {
	id: string;
	isCloseIcon?: boolean;
	title?: string | TemplateRef<T> | null;
	titleTemplate?: TemplateRef<T> | null;
	footer?: TemplateRef<T> | null;
	margin?: string;
	width?: string;
	height?: string;
	isFullSize?: boolean;
	top?: string;
	content: TemplateRef<T> | null;
}
