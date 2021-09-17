import { useState, useEffect } from 'react';

export default function useLoadFonts(families) {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    useEffect(() => {
        async function loadFonts() {
            const WebFontLoader = (await import('webfontloader')).default;
            WebFontLoader.load({
                active: () => setFontsLoaded(true),
                inactive: () => setFontsLoaded(true),
                custom: { families },
                classes: false,
            });
        }
        loadFonts();
    }, [families]);
    return fontsLoaded;
}
