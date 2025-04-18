export class Contact {
    id:number;
    name!:string;
    email!:string;
    website!:string;
    projects!:string[];
    image!:string;
    featured:boolean;
    constructor(id:number,name:string, email:string,
        website:string,
        projects:string[],
        image:string,featured:boolean){
        this.id=id;
        this.name=name;
        this.website=website;
        this.projects=projects;
        this.image=image;
        this.featured=featured;
    }
}
