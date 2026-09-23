from fastapi import FastAPI,Depends,HTTPException,Query

from sqlalchemy.orm import Session
from database import session,engine

from datetime import datetime,timedelta,timezone

from modes import Post,Suggestion,Profile,Follow,Usercreate,Story,myposts

import database_models

from fastapi.middleware.cors import CORSMiddleware

from jose import JWTError,jwt

from passlib.context import CryptContext

from fastapi.security import HTTPAuthorizationCredentials,HTTPBearer

security=HTTPBearer()
import os






database_models.Base.metadata.create_all(bind=engine)

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True
)


def get_db():
    db=session()
    try:
        yield db
    finally:
        db.close()

Posts=[
    Post(id=1,profile_pic=r"/images/john.jpg",
    image=r"/images/beach.jpg",username="John_doe",
    likes=123,caption="i am john_doe at beach"),

    Post(id=2,profile_pic=r"/images/alice.jpg",
    image=r"/images/mountains.jpg",username="alice_land",
    likes=123,caption="i am john_doe at beach"),

    Post(id=3,profile_pic=r"/images/mark.jpg",
    image=r"/images/sunset.jpg",username="marenry",
    likes=123,caption="i am john_doe at beach")

]


Profiles=[
    Profile(id=1,profile_pic="/images/john.jpg",username="john_doe")

]

Suggestions=[
    Suggestion(id=1,profile_pic=r"/images/alice.jpg",username="alicinda"),
    Suggestion(id=2,profile_pic=r"/images/mark.jpg",username="hion"),
    Suggestion(id=3,profile_pic=r"/images/alice.jpg",username="lion")


]

Storys=[
    Story(id=1,username="alicinda",profile_pic="/images/p1.jpg"),
    Story(id=2,username="hion",profile_pic="/images/p2.jpg"),
    Story(id=3,username="lion",profile_pic="/images/p3.jpg"),
    Story(id=4,username="niuon",profile_pic="/images/p4.jpg")


]



def init_db(db:Session=Depends(get_db)):
    db=session()
    count=db.query(database_models.Post).count()
    if count==0:
        for post in Posts:
            db.add(database_models.Post(**post.model_dump()))
        db.commit()
    
    count=db.query(database_models.Profile).count()
    if count==0:
        for profile in Profiles:
            db.add(database_models.Profile(**profile.model_dump()))
        db.commit()

    count=db.query(database_models.Suggestion).count()
    if count==0:
        for suggestion in Suggestions:
            db.add(database_models.Suggestion(**suggestion.model_dump()))
        db.commit()
    count=db.query(database_models.Story).count()
    if count==0:
        for story in Storys:
            db.add(database_models.Story(**story.model_dump()))
        db.commit()
  


init_db()




def getcurrentuser(
        credentials:HTTPAuthorizationCredentials=Depends(security)
):
    token=credentials.credentials
    user_id=verify_token(token)
    return user_id

@app.get('/myposts') 
def johnpost(db:Session=Depends(get_db),current_user:int=Depends(getcurrentuser)
             ,page:int=Query(1,ge=1),
             limit:int=Query(2,ge=1,le=100)):
    
    johnpost=db.query(database_models.myposts).filter(database_models.myposts.user_id==current_user)
    offset=(page-1)*limit
    total=johnpost.count()

    posts=johnpost.order_by(database_models.myposts.id.desc()).offset(offset).limit(limit).all()
    if not posts:
        raise HTTPException(
            status_code=404,detail="posts not found"
        )
    return posts

@app.get('/Search')
def search(uname:str,db:Session=Depends(get_db)):
    search=db.query(database_models.User).filter(database_models.User.username.ilike(f"%{uname}%")).all()
    if not search:
            raise HTTPException(
                status_code=404,detail=f"{uname}  not found"
            )
    return search

@app.get('/posts')
def postz(db:Session=Depends(get_db),current_user:int=Depends(getcurrentuser)):
    get_post=db.query(database_models.Post).all()
    if not get_post:
            raise HTTPException(
                status_code=404,detail="posts not found"
            )
    return get_post

@app.get('/profile')
def postz(db:Session=Depends(get_db),current_user:int=Depends(getcurrentuser)):
    get_post=db.query(database_models.Profile).filter(database_models.Profile.user_id==current_user).all()
    if not get_post:
            raise HTTPException(
                status_code=404,detail="user not found"
            )
    return get_post

@app.get('/profile/{id}')
def postz(id:int,db:Session=Depends(get_db)):
    get_post=db.query(database_models.Profile).filter(database_models.Profile.id==id).first()
    if not get_post:
            raise HTTPException(
                status_code=404,detail="posts not found"
            )
    return get_post

@app.put('/profile/{id}')
def postz(id:int,profile:Profile,db:Session=Depends(get_db)):
    get_post=db.query(database_models.Profile).filter(database_models.Profile.id==id).first()
    if get_post:
        get_post.username=profile.username
        get_post.profile_pic=profile.profile_pic
        db.commit()
    if not get_post:
            raise HTTPException(
                status_code=404,detail="posts not found"
            )

    return get_post

@app.get('/suggestion')
def postz(db:Session=Depends(get_db)):
    get_post=db.query(database_models.Suggestion).all()
    if not get_post:
            raise HTTPException(
                status_code=404,detail="suggestions not found"
            )
    return get_post 





@app.get('/story')
def postz(db:Session=Depends(get_db),current_user:int=Depends(getcurrentuser)):
    get_post=db.query(database_models.Story).all()
    if not get_post:
            raise HTTPException(
                status_code=404,detail="posts not found"
            )
    return get_post 


@app.get('/story/{id}')
def postz(id:int,db:Session=Depends(get_db)):
   
    get_post=db.query(database_models.Story).filter(database_models.Story.id==id).first()
    if not get_post:
            raise HTTPException(
                status_code=404,detail="posts not found"
            )
    return get_post 




@app.post('/followers')
def posti(follow:Follow,db:Session=Depends(get_db)):
    add_post=database_models.Follow(**follow.model_dump())
    db.add(add_post)
    db.commit()
    if not add_post:
            raise HTTPException(
                status_code=404,detail="followers not found"
            )


@app.delete('/followers/{id}')
def postz(id:int,db:Session=Depends(get_db)):
    get_post=db.query(database_models.Follow).filter(database_models.Follow.id==id).first()
    if get_post:
      db.delete(get_post)
      db.commit()
    if not get_post:
            raise HTTPException(
                status_code=404,detail="posts not found"
            )
    return "unfollowed"



@app.get('/followers')
def postz(db:Session=Depends(get_db)):
    get_post=db.query(database_models.Follow).all()
    if not get_post:
            raise HTTPException(
                status_code=404,detail="posts not found"
            )
    return get_post 



secret_key=os.getenv("secret_key")
algo="HS256"
accesstime=70


def create_token(user_id:str):
    expiry=datetime.now(timezone.utc)+timedelta(minutes=accesstime)


    payload={"user_id":user_id,"exp":expiry.timestamp()}
    print("CURRENT TIME:", datetime.now(timezone.utc))
    print("EXPIRY TIME:", expiry)
    return jwt.encode(payload,secret_key,algorithm=algo)



def verify_token(token: str):
    try:
        print("RECEIVED TOKEN:", token)

        payload = jwt.decode(
            token,
            secret_key,
            algorithms=[algo]
        )

        print("PAYLOAD:", payload)

        return payload["user_id"]

    except Exception as e:
        print("JWT ERROR:", e)

        raise HTTPException(
            status_code=401,
            detail=f"Invalid token: {str(e)}"
        )

pwd_context=CryptContext(
    schemes=["bcrypt"],
    deprecated='auto'
     )   

@app.post("/users")
def create_users(user:Usercreate,db:Session=Depends(get_db)):
    

    existing_user=db.query(database_models.User).filter(database_models.User.email==user.email).first()
    if existing_user:
        raise HTTPException(status_code=400,detail="invalid username or password")
    hashed_password=pwd_context.hash(user.password)
    create_user=database_models.User(
        email=user.email,
        password=hashed_password
    )
    db.add(create_user)
    db.commit()
    return {"message":"user added to db"}

@app.post("/login")
def login(user:Usercreate,db:Session=Depends(get_db)):
    
    emailvalue=db.query(database_models.User).filter(database_models.User.email==user.email).first()
    if emailvalue and pwd_context.verify(user.password,emailvalue.password):
            token=create_token(emailvalue.id)
            return {
    "access_token": token,
    "token_type": "bearer"
}
    raise HTTPException(status_code=404,detail="invalid username or password")
    




