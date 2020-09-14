class Register<T> {
    // @ts-ignore
    private value: T = null;

    public get(): T {
        return this.value
    }

    public set(value: T): void {
        this.value = value;
    }
}

export default Register;
