export interface registerError {
    firstname?: string,
    lastname?: string,
    email?: string,
    phone?:string,
    role?: string,
    password?: string,
    confirmpassword?: string,
}

export interface userData {
    token:string
    user:user
}

export interface user{
    _id?:string,
    firstname?: string,
    lastname?: string,
    email?: string,
    phone?:string,
    role?: string,
    password?: string,
    confirmpassword?: string|null,
    isLoading?:boolean,
    error?:string,
}

export interface transactiondUser {
    _id: string;
    bookId: string;
    createdAt: string;
    updatedAt: string;
    userId: user,
    __v: number;
  }
  