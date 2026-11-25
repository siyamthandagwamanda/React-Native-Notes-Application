import { Platform } from "react-native";

export const CATEGORIES = ['Work', 'Study', 'Personal'];

export const NOTE_COLORS = ['#FFFFFF', '#FEF3C7', '#DBEAFE', '#DCFCE7'];

export const NOTE_FONTS = ['Default', 'Serif', 'Mono'];

export function fontFamily(font?: string){

    if (font === 'Serif') return Platform.select({ ios: 'Georgia', default: 'serif'});

    if (font === 'Mono') return Platform.select({ ios: 'Courier', default: 'monospace'});

    return undefined;
}

