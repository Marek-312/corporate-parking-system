import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {tap}from 'rxjs';

interface AuthReponse{
    accesToken:string;
}