// Useful SVGs
export function pencil_svg(width: number, height: number) {
	return `<svg fill="#FFF" width="${width}px" height="${height}px" viewBox="0 0 528.899 528.899"><g><path d="M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981 c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611 C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069 L27.473,390.597L0.3,512.69z"/></g></svg>`;
}

export const INFO_SVG =
	'<svg width="24px" height="24px" focusable="false" viewBox="0 0 24 24"><path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"></path></svg>';

export const ADD_USER_SVG =
	'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M16 19h6" /><path d="M19 16v6" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4" /></svg>';

export const CAUTION_SVG =
	'<svg style="display: inline-block; vertical-align: inherit" viewBox="0 0 16 16" width="20" height="20"><path d="M4.47.22A.749.749 0 0 1 5 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 0 1-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53Zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>';

export const WARNING_SVG =
	'<svg style="display: inline-block; vertical-align: inherit" viewBox="0 0 16 16" width="20" height="20"><path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>';

export const ARROW_DOLLAR_SVG = '<svg width=24 height=24 viewBox="0 0 24 24" fill="none"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g> <path d="M13.3085 0.293087C13.699 -0.0976958 14.3322 -0.0976956 14.7227 0.293087L17.7186 3.29095C18.1091 3.68175 18.1091 4.31536 17.7185 4.70613L14.716 7.71034C14.3255 8.10113 13.6923 8.10113 13.3018 7.71034C12.9113 7.31956 12.9113 6.68598 13.3018 6.2952L14.6087 4.98743L7 4.98743C6.44771 4.98743 6 4.53942 6 3.98677C6 3.43412 6.44771 2.98611 7 2.98611L14.5855 2.9861L13.3085 1.70824C12.918 1.31745 12.918 0.683869 13.3085 0.293087Z" fill="#0F0F0F"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 20.998C14.2091 20.998 16 19.206 16 16.9954C16 14.7848 14.2091 12.9927 12 12.9927C9.79086 12.9927 8 14.7848 8 16.9954C8 19.206 9.79086 20.998 12 20.998ZM12 19.0934C10.842 19.0934 9.90331 18.1541 9.90331 16.9954C9.90331 15.8366 10.842 14.8973 12 14.8973C13.158 14.8973 14.0967 15.8366 14.0967 16.9954C14.0967 18.1541 13.158 19.0934 12 19.0934Z" fill="#0F0F0F"></path> <path d="M7 16.9954C7 17.548 6.55229 17.996 6 17.996C5.44772 17.996 5 17.548 5 16.9954C5 16.4427 5.44772 15.9947 6 15.9947C6.55229 15.9947 7 16.4427 7 16.9954Z" fill="#0F0F0F"></path> <path d="M19 16.9954C19 17.548 18.5523 17.996 18 17.996C17.4477 17.996 17 17.548 17 16.9954C17 16.4427 17.4477 15.9947 18 15.9947C18.5523 15.9947 19 16.4427 19 16.9954Z" fill="#0F0F0F"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M21 9.99074C22.6569 9.99074 24 11.3348 24 12.9927V20.998C24 22.656 22.6569 24 21 24H3C1.34315 24 0 22.656 0 20.998V12.9927C0 11.3348 1.34315 9.99074 3 9.99074H21ZM4 11.9921H20C20 12.2549 20.0517 12.5151 20.1522 12.7579C20.2528 13.0007 20.4001 13.2214 20.5858 13.4072C20.7715 13.593 20.992 13.7405 21.2346 13.841C21.4773 13.9416 21.7374 13.9934 22 13.9934V19.9974C21.7374 19.9974 21.4773 20.0491 21.2346 20.1497C20.992 20.2503 20.7715 20.3977 20.5858 20.5835C20.4001 20.7694 20.2528 20.99 20.1522 21.2328C20.0517 21.4756 20 21.7359 20 21.9987H4C4 21.7359 3.94827 21.4756 3.84776 21.2328C3.74725 20.99 3.59993 20.7694 3.41421 20.5835C3.2285 20.3977 3.00802 20.2503 2.76537 20.1497C2.52272 20.0491 2.26264 19.9974 2 19.9974V13.9934C2.26264 13.9934 2.52272 13.9416 2.76537 13.841C3.00802 13.7405 3.2285 13.593 3.41421 13.4072C3.59993 13.2214 3.74725 13.0007 3.84776 12.7579C3.94827 12.5151 4 12.2549 4 11.9921Z" fill="#0F0F0F"></path> </g></svg>'
