// 申明外部 npm 插件模块
declare module 'vue-grid-layout';
declare module 'js-cookie';
declare module 'codemirror';

// 声明一个模块，防止引入文件时报错
declare module '*.json';
declare module '*.png';
declare module '*.jpg';
declare module '*.scss';
declare module '*.ts';
declare module '*.js';

// 声明文件，定义全局变量
/* eslint-disable */
declare interface Window {
	nextLoading: boolean;

}


// 声明 ref
declare type RefType<T = any> = T | null;

// 声明 HTMLElement
declare type HtmlType = HTMLElement | string | undefined | null;

// 申明 children 可选
declare type ChilType<T = any> = {
	children?: T[];
};

// 申明 数组
declare type EmptyArrayType<T = any> = T[];

// 申明 对象
declare type EmptyObjectType<T = any> = {
	[key: string]: T;
};

// 申明 select option
declare type SelectOptionType = {
	value: string | number;
	label: string | number;
};