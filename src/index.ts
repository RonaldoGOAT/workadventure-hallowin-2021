/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />
import {bootstrapExtra} from '@workadventure/scripting-api-extra'

console.log('Script started successfully');

async function extendedFeatures() {
    try {
        await bootstrapExtra()
        console.log('Scripting API Extra loaded successfully');
    } catch (error) {
        console.error('Scripting API Extra ERROR',error);
    }
}
extendedFeatures();

// Manage the animations
//WA.room.onEnterZone('animateItem', () => WA.room.hideLayer('staticItem'));
//WA.room.onLeaveZone('animateItem', () => WA.room.showLayer('staticItem'));

// Manage popups
let currentZone: string;
let currentPopup: any;

const config = [
    {
        zone: 'HalloWIN2022',
        message: 'See you for #HalloWIN 2022. You are not ready.',
        cta: [
            {
                label: 'I\'ll be there.',
                className: 'error',
                callback: () => closePopup(),
            }
        ]
    }
]

// hallowin 2022 popup
WA.room.onEnterZone('HalloWIN2022', () => {
    openPopup('HalloWIN2022')
});
WA.room.onLeaveZone('HalloWIN2022', closePopup);

// Popup management functions
function openPopup(zoneName: string) {
    currentZone = zoneName
    const popupName = zoneName + 'Popup'
    const zone = config.find((item) => {
        return item.zone == zoneName
    });

    if (typeof zone !== 'undefined') {
        // @ts-ignore otherwise we can't use zone.cta object
        currentPopup = WA.ui.openPopup(popupName, zone.message, zone.cta)
    }
}
function closePopup(){
    if (typeof currentPopup !== 'undefined') {
        currentPopup.close();
        currentPopup = undefined;
    }
}
