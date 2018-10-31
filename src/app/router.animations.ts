import { animate, state, style, transition, trigger, query } from '@angular/animations';

export function routerTransition() {
    return slideToBottom();
}

export function slideToRight() {
    
    return trigger('slideToRight', [
        // state('void', style({})),
        // state('*', style({})),
        // transition(':enter', [
        //     style({ transform: 'translateX(-100%)' }),
        //     animate('0.3s ease-in-out', style({ transform: 'translateX(0%)' }))
        // ]),
        // transition(':leave', [
        //     style({ transform: 'translateX(0%)' }),
        //     animate('0.3s ease-in-out', style({ transform: 'translateX(-100%)' }))
        // ])
        transition( '* => *', [
            query(':enter', 
                [
                    style({ opacity: 0 })
                ], 
                { optional: true }
            ),
            query(':leave', 
                [
                    style({ opacity: 1 }),
                    animate('0.3s', style({ opacity: 0 }))
                ], 
                { optional: true }
            ),
            query(':enter', 
                [
                    style({ opacity: 0 }),
                    animate('0.3s', style({ opacity: 1 }))
                ], 
                { optional: true }
            )
        ])
    ]);
}

export function slideToLeft() {
    return trigger('slideToLeft', [
        state('void', style({})),
        state('*', style({})),
        transition(':enter', [
            style({ transform: 'translateX(100%)' }),
            animate('0.3s ease-in-out', style({ transform: 'translateX(0%)' }))
        ]),
        transition(':leave', [
            style({ transform: 'translateX(0%)' }),
            animate('0.3s ease-in-out', style({ transform: 'translateX(100%)' }))
        ])
    ]);
}

export function slideToBottom() {
    return trigger('slideToBottom', [
        state('void', style({})),
        state('*', style({})),
        transition(':enter', [
            style({ transform: 'translateY(-100%)' }),
            animate('0.3s ease-in-out', style({ transform: 'translateY(0%)' }))
        ]),
        transition(':leave', [
            style({ transform: 'translateY(0%)' }),
            animate('0.3s ease-in-out', style({ transform: 'translateY(-100%)' }))
        ])
    ]);
}

export function slideToTop() {
    return trigger('slideToTop', [
        state('void', style({})),
        state('*', style({})),
        transition(':enter', [
            style({ transform: 'translateY(100%)' }),
            animate('0.3s ease-in-out', style({ transform: 'translateY(0%)' }))
        ]),
        transition(':leave', [
            style({ transform: 'translateY(0%)' }),
            animate('0.3s ease-in-out', style({ transform: 'translateY(100%)' }))
        ])
    ]);
}

export function expand() {
    return trigger('expand', [
        state('void', style({})),
        state('*', style({})),
        transition(':enter', [
            style({ transform: 'translateY(100%)' }),
            animate('0.3s 1s', style({ transform: 'translateY(0%)' }))
        ]),
        transition(':leave', [
            style({ transform: 'translateY(0%)' }),
            animate('0.3s 1s', style({ transform: 'translateY(100%)' }))
        ])
    ]);
}

export function fadeAnimation(){
    return trigger('fadeAnimation', [
        transition( '* => *', [
            query(':enter', 
                [
                    style({ opacity: 0 })
                ], 
                { optional: true }
            ),
            query(':leave', 
                [
                    style({ opacity: 1 }),
                    animate('0.2s', style({ opacity: 0 }))
                ], 
                { optional: true }
            ),
            query(':enter', 
                [
                    style({ opacity: 0 }),
                    animate('0.2s', style({ opacity: 1 }))
                ], 
                { optional: true }
            )
        ])
    ]);
}

export function loader(){
    return trigger('loader', [
        state('in', style({ transform: 'translateY(0)' })),
        transition('void => *', [
            style({ transform: 'translateY(-100%)' }),//scale3d(.3, .3, .3)
            animate(150)
        ]),
        transition('* => void', [
            animate(100, style({ transform: 'translateY(0)' }))//scale3d(.0, .0, .0)
        ])
    ])
}