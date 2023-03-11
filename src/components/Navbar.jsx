import React from 'react'

export default function Navbar() {
  return (
    <div>
      
  <nav class="navbar sticky-top navbar-expand-lg ">
    <div class="container">
      <a class="navbar-brand" href="#">CONVIN</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
   <i class="fas fa-bars"></i>
  </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto w-100 justify-content-end">
          <li class="nav-item active">
            <a class="nav-link" href="/">All Buckets <span class="sr-only"></span></a>
          </li>
          {/* <li class="nav-item">
            <a class="nav-link" href="#">About</a></li>
            <li class="nav-item">
              <a class="nav-link" href="#">Contact</a></li>
              <li class="nav-item">
                <a class="nav-link" href="#">Services</a></li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Other</a>
                </li> */}
        </ul>
      </div>
    </div>
  </nav>
    </div>
  )
}
