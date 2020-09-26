class Register<T> {
    private value: T | null;
    private initialValue: T | null;

    constructor(initValue: T | null = null) {
        this.value = initValue;
        this.initialValue = initValue;
    }

    public get(): T | null {
        return this.value
    }

    public set(value: T): void {
        this.value = value;

        if (this.initialValue === null) {
            this.initialValue = value;
        }
    }

    public reset(): void {
        this.value = this.initialValue;
    }
}

export default Register;
