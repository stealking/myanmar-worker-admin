export interface IHeaderProps {
    name: string;
    className?: string;
}

export default function Header({ name, className }: IHeaderProps) {
    const classes = className
        ? `text-xl font-semibold text-gray-700 ${className}`
        : "text-xl font-semibold text-gray-700";
    return <h1 className={classes}>{name}</h1>;
}
