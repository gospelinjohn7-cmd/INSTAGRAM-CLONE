from pydantic import BaseModel,Field,EmailStr,field_validator

class Post(BaseModel):
    id:int
    profile_pic:str
    image:str
    username:str
    likes:int
    caption:str

class Profile(BaseModel):
    id:int
    profile_pic:str
    username:str

class Suggestion(BaseModel):
    id:int
    profile_pic:str
    username:str

class Follow(BaseModel):
    id:int
    username:str

class Usercreate(BaseModel):
    
    email:EmailStr
    password:str=Field(
        min_length=3,
        max_length=15

    )
    @field_validator("password")
    @classmethod
    def validate_username(cls,value):
        if not any(c.islower() for c in value) :
            raise ValueError("password must contain a lowercase letter")
        if not any(c.isupper() for c in value):
            raise ValueError("password must contain a uppercase letter")
        if not any(c.isdigit() for c in value):
            raise ValueError("password must contain a digit")
        if not any(c.isalnum() for c in value):
            raise ValueError("password must contain a special character")
        return value
        
        



class Story(BaseModel):
    id:int
    username:str
    profile_pic:str

class myposts(BaseModel):
    id:int
    post_image:str
    likes:str
    caption:str