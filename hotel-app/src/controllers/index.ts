class IndexController {
    public getHome(req: Request, res: Response): void {
        res.send("Welcome to the Hotel App!");
    }

    public getRooms(req: Request, res: Response): void {
        res.send("List of rooms");
    }

    public getBooking(req: Request, res: Response): void {
        res.send("Booking details");
    }
}

export default IndexController;