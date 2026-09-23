from sqlalchemy import Column,Integer,String,ForeignKey

from sqlalchemy.ext.declarative import declarative_base

Base=declarative_base()

class Post(Base):


    __tablename__="posts"
    id=Column(Integer,primary_key=True)
    profile_pic=Column(String(255))
    username=Column(String(10))
    image=Column(String(255))
    likes=Column(Integer)
    caption= Column(String(50))

class Profile(Base):

    __tablename__="profile"
    id=Column(Integer,primary_key=True)
    profile_pic=Column(String(255))
    username=Column(String(40))
    user_id=Column(Integer,ForeignKey("users.id"))


class Suggestion(Base):

    __tablename__="suggestions"
    id=Column(Integer,primary_key=True)
    profile_pic=Column(String(255))
    username=Column(String(40))


class Story(Base):

    __tablename__="story"
    id=Column(Integer,primary_key=True)
    profile_pic=Column(String(255))
    username=Column(String(40))

class Follow(Base):

    __tablename__="followers"
    id=Column(Integer,primary_key=True)
    username=Column(String(30))

class User(Base):
     __tablename__="users"
     id=Column(Integer,primary_key=True)
     email=Column(String(25),unique=True,nullable=False)
     password=Column(String(255),nullable=False)


class myposts(Base):

    __tablename__="myposts"
    id=Column(Integer,primary_key=True)
    post_image=Column(String(255))
    likes=Column(String(255))
    caption=Column(String(255)) 