export interface IUser {
	name: string;
	score: number;
	position: number;
	id: string;
	prevName: string;
	place: {
		title: string;
		arrow: string;
		color: string;
	};
}
export type IUsers = Array<Array<IUser>>;
