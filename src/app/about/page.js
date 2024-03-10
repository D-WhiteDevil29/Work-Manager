export async function takeTime() {
    await new Promise((resolve) => {
        setTimeout(resolve, 3000);
    });
}

const about = async () => {
    await takeTime();
    // throw new Error("This is manual error");
    return (
        <div>
            <h1 className='m-20 text-5xl font-medium'> This is about page</h1>
        </div>
    )
}

export default about;
