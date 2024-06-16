const headerAdmin = () => {
  return (
    <div>
      <nav
        className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow"
        style={{ height: "70px", borderRadius: "0" }}
      >
        <button
          id="sidebarToggleTop"
          className="btn btn-link d-md-none rounded-circle mr-3"
        >
          <i className="fa fa-bars"></i>
        </button>

        <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
          <div className="input-group">
            <input
              type="text"
              className="form-control bg-light border-0 small"
              placeholder="Search for..."
              aria-label="Search"
              aria-describedby="basic-addon2"
            />
            <div className="input-group-append">
              <button
                className="btn "
                type="button"
                style={{ backgroundColor: "#4e73df", color: "#fff" }}
              >
                <i className="fas fa-search fa-sm"></i>
              </button>
            </div>
          </div>
        </form>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown no-arrow d-sm-none">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="searchDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fas fa-search fa-fw"></i>
            </a>
            <div
              className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
              aria-labelledby="searchDropdown"
            >
              <form className="form-inline mr-auto w-100 navbar-search">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control bg-light border-0 small"
                    placeholder="Search for..."
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="button">
                      <i className="fas fa-search fa-sm"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </li>

          {/* <li className="nav-item dropdown no-arrow mx-1">
                <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-bell fa-fw"></i>
                    <span className="badge badge-danger badge-counter">3+</span>
                </a>
                <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
                    <h6 className="dropdown-header">
                        Alerts Center
                    </h6>
                    <a className="dropdown-item d-flex align-items-center" href="#">
                        <div className="mr-3">
                            <div className="icon-circle bg-primary">
                                <i className="fas fa-file-alt text-white"></i>
                            </div>
                        </div>
                        <div>
                            <div className="small text-gray-500">December 12, 2019</div>
                            <span className="font-weight-bold">A new monthly report is ready to download!</span>
                        </div>
                    </a>
                    <a className="dropdown-item d-flex align-items-center" href="#">
                        <div className="mr-3">
                            <div className="icon-circle bg-success">
                                <i className="fas fa-donate text-white"></i>
                            </div>
                        </div>
                        <div>
                            <div className="small text-gray-500">December 7, 2019</div>
                            $290.29 has been deposited into your account!
                        </div>
                    </a>
                    <a className="dropdown-item d-flex align-items-center" href="#">
                        <div className="mr-3">
                            <div className="icon-circle bg-warning">
                                <i className="fas fa-exclamation-triangle text-white"></i>
                            </div>
                        </div>
                        <div>
                            <div className="small text-gray-500">December 2, 2019</div>
                            Spending Alert: ve noticed unusually high spending for your account.
                        </div>
                    </a>
                    <a className="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
                </div>
            </li> */}

          {/* <li className="nav-item dropdown no-arrow mx-1">
                <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-envelope fa-fw"></i>
                    <span className="badge badge-danger badge-counter">7</span>
                </a>
                <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="messagesDropdown">
                    <h6 className="dropdown-header">
                        Message Center
                    </h6>
                    <a className="dropdown-item d-flex align-items-center" href="#">
                        <div className="dropdown-list-image mr-3">
                            <img className="rounded-circle" src="img/undraw_profile_1.svg" alt="..."/>
                            <div className="status-indicator bg-success"></div>
                        </div>
                        <div className="font-weight-bold">
                            <div className="text-truncate">Hi there! I am wondering if you can help me with a
                                problem  been having.</div>
                            <div className="small text-gray-500">Emily Fowler · 58m</div>
                        </div>
                    </a>
                    <a className="dropdown-item d-flex align-items-center" href="#">
                        <div className="dropdown-list-image mr-3">
                            <img className="rounded-circle" src="img/undraw_profile_2.svg" alt="..."/>
                            <div className="status-indicator"></div>
                        </div>
                        <div>
                            <div className="text-truncate">I have the photos that you ordered last month, how
                                would you like them sent to you?</div>
                            <div className="small text-gray-500">Jae Chun · 1d</div>
                        </div>
                    </a>
                    <a className="dropdown-item d-flex align-items-center" href="#">
                        <div className="dropdown-list-image mr-3">
                            <img className="rounded-circle" src="img/undraw_profile_3.svg" alt="..."/>
                            <div className="status-indicator bg-warning"></div>
                        </div>
                        <div>
                            <div className="text-truncate">Last  report looks great, I am very happy with
                                the progress so far, keep up the good work!</div>
                            <div className="small text-gray-500">Morgan Alvarez · 2d</div>
                        </div>
                    </a>
                    <a className="dropdown-item d-flex align-items-center" href="#">
                        <div className="dropdown-list-image mr-3">
                            <img className="rounded-circle" src="https://source.unsplash.com/Mv9hjnEUHR4/60x60" alt="..."/>
                            <div className="status-indicator bg-success"></div>
                        </div>
                        <div>
                            <div className="text-truncate">Am I a good boy? The reason I ask is because someone
                                told me that people say this to all dogs, even if they  good...</div>
                            <div className="small text-gray-500">Chicken the Dog · 2w</div>
                        </div>
                    </a>
                    <a className="dropdown-item text-center small text-gray-500" href="#">Read More Messages</a>
                </div>
            </li> */}

          <div className="topbar-divider d-none d-sm-block"></div>

          <li className="nav-item dropdown no-arrow">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                Admin
              </span>
              <i className="bi bi-person-fill"></i>
            </a>
            <div
              className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
              aria-labelledby="userDropdown"
            >
              <a className="dropdown-item" href="#">
                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                Profile
              </a>
              <a className="dropdown-item" href="#">
                <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                Settings
              </a>
              <a className="dropdown-item" href="#">
                <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                Activity Log
              </a>
              <div className="dropdown-divider"></div>
              <a
                className="dropdown-item"
                href="#"
                data-toggle="modal"
                data-target="#logoutModal"
              >
                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                Logout
              </a>
            </div>
          </li>
        </ul>
      </nav>
    </div>
    //     <header className="main-header">
    //     <a href="../../index2.html" className="logo">
    //       <span className="logo-mini"><b>A</b>LT</span>
    //       <span className="logo-lg"><b>Admin</b>LTE</span>
    //     </a>
    //     <nav className="navbar navbar-static-top">
    //       <a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
    //         <span className="sr-only">Toggle navigation</span>
    //         <span className="icon-bar"></span>
    //         <span className="icon-bar"></span>
    //         <span className="icon-bar"></span>
    //       </a>

    //       <div className="navbar-custom-menu">
    //         <ul className="nav navbar-nav">
    //           <li className="dropdown messages-menu">
    //             <a href="#" className="dropdown-toggle" data-toggle="dropdown">
    //               <i className="fa fa-envelope-o"></i>
    //               <span className="label label-success">4</span>
    //             </a>
    //             <ul className="dropdown-menu">
    //               <li className="header">You have 4 messages</li>
    //               <li>
    //                 <div className="slimScrollDiv" style="position: relative; overflow: hidden; width: auto; height: 200px;"><ul className="menu" style="overflow: hidden; width: 100%; height: 200px;">
    //                   <li>
    //                     <a href="#">
    //                       <div className="pull-left">
    //                         <img src="../../dist/img/user2-160x160.jpg" className="img-circle" alt="User Image"/>
    //                       </div>
    //                       <h4>
    //                         Support Team
    //                         <small><i className="fa fa-clock-o"></i> 5 mins</small>
    //                       </h4>
    //                       <p>Why not buy a new awesome theme?</p>
    //                     </a>
    //                   </li>
    //                   <li>
    //                     <a href="#">
    //                       <div className="pull-left">
    //                         <img src="../../dist/img/user3-128x128.jpg" className="img-circle" alt="User Image"/>
    //                       </div>
    //                       <h4>
    //                         AdminLTE Design Team
    //                         <small><i className="fa fa-clock-o"></i> 2 hours</small>
    //                       </h4>
    //                       <p>Why not buy a new awesome theme?</p>
    //                     </a>
    //                   </li>
    //                   <li>
    //                     <a href="#">
    //                       <div className="pull-left">
    //                         <img src="../../dist/img/user4-128x128.jpg" className="img-circle" alt="User Image"/>
    //                       </div>
    //                       <h4>
    //                         Developers
    //                         <small><i className="fa fa-clock-o"></i> Today</small>
    //                       </h4>
    //                       <p>Why not buy a new awesome theme?</p>
    //                     </a>
    //                   </li>
    //                   <li>
    //                     <a href="#">
    //                       <div className="pull-left">
    //                         <img src="../../dist/img/user3-128x128.jpg" className="img-circle" alt="User Image"/>
    //                       </div>
    //                       <h4>
    //                         Sales Department
    //                         <small><i className="fa fa-clock-o"></i> Yesterday</small>
    //                       </h4>
    //                       <p>Why not buy a new awesome theme?</p>
    //                     </a>
    //                   </li>
    //                   <li>
    //                     <a href="#">
    //                       <div className="pull-left">
    //                         <img src="../../dist/img/user4-128x128.jpg" className="img-circle" alt="User Image"/>
    //                       </div>
    //                       <h4>
    //                         Reviewers
    //                         <small><i className="fa fa-clock-o"></i> 2 days</small>
    //                       </h4>
    //                       <p>Why not buy a new awesome theme?</p>
    //                     </a>
    //                   </li>
    //                 </ul><div className="slimScrollBar" style="background: rgb(0, 0, 0); width: 3px; position: absolute; top: 0px; opacity: 0.4; display: block; border-radius: 7px; z-index: 99; right: 1px;"></div><div className="slimScrollRail" style="width: 3px; height: 100%; position: absolute; top: 0px; display: none; border-radius: 7px; background: rgb(51, 51, 51); opacity: 0.2; z-index: 90; right: 1px;"></div></div>
    //               </li>
    //               <li className="footer"><a href="#">See All Messages</a></li>
    //             </ul>
    //           </li>
    //           <li className="dropdown notifications-menu">
    //             <a href="#" className="dropdown-toggle" data-toggle="dropdown">
    //               <i className="fa fa-bell-o"></i>
    //               <span className="label label-warning">10</span>
    //             </a>
    //             <ul className="dropdown-menu">
    //               <li className="header">You have 10 notifications</li>
    //               <li>
    //                 <div className="slimScrollDiv" style="position: relative; overflow: hidden; width: auto; height: 200px;"><ul className="menu" style="overflow: hidden; width: 100%; height: 200px;">
    //                   <li>
    //                     <a href="#">
    //                       <i className="fa fa-users text-aqua"></i> 5 new members joined today
    //                     </a>
    //                   </li>
    //                   <li>
    //                     <a href="#">
    //                       <i className="fa fa-warning text-yellow"></i> Very long description here that may not fit into the
    //                       page and may cause design problems
    //                     </a>
    //                   </li>
    //                   <li>
    //                     <a href="#">
    //                       <i className="fa fa-users text-red"></i> 5 new members joined
    //                     </a>
    //                   </li>

    //                   <li>
    //                     <a href="#">
    //                       <i className="fa fa-shopping-cart text-green"></i> 25 sales made
    //                     </a>
    //                   </li>
    //                   <li>
    //                     <a href="#">
    //                       <i className="fa fa-user text-red"></i> You changed your username
    //                     </a>
    //                   </li>
    //                 </ul><div className="slimScrollBar" style="background: rgb(0, 0, 0); width: 3px; position: absolute; top: 0px; opacity: 0.4; display: block; border-radius: 7px; z-index: 99; right: 1px;"></div><div className="slimScrollRail" style="width: 3px; height: 100%; position: absolute; top: 0px; display: none; border-radius: 7px; background: rgb(51, 51, 51); opacity: 0.2; z-index: 90; right: 1px;"></div></div>
    //               </li>
    //               <li className="footer"><a href="#">View all</a></li>
    //             </ul>
    //           </li>
    //           <li className="dropdown tasks-menu">
    //             <a href="#" className="dropdown-toggle" data-toggle="dropdown">
    //               <i className="fa fa-flag-o"></i>
    //               <span className="label label-danger">9</span>
    //             </a>
    //             <ul className="dropdown-menu">
    //               <li className="header">You have 9 tasks</li>
    //               <li>
    //                 <div className="slimScrollDiv" style="position: relative; overflow: hidden; width: auto; height: 200px;"><ul className="menu" style="overflow: hidden; width: 100%; height: 200px;">
    //                   <li>
    //                     <a href="#">
    //                       <h3>
    //                         Design some buttons
    //                         <small className="pull-right">20%</small>
    //                       </h3>
    //                       <div className="progress xs">
    //                         <div className="progress-bar progress-bar-aqua" style="width: 20%" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
    //                           <span className="sr-only">20% Complete</span>
    //                         </div>
    //                       </div>
    //                     </a>
    //                   </li>

    //                   <li>
    //                     <a href="#">
    //                       <h3>
    //                         Create a nice theme
    //                         <small className="pull-right">40%</small>
    //                       </h3>
    //                       <div className="progress xs">
    //                         <div className="progress-bar progress-bar-green" style="width: 40%" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
    //                           <span className="sr-only">40% Complete</span>
    //                         </div>
    //                       </div>
    //                     </a>
    //                   </li>
    //                   <li>
    //                     <a href="#">
    //                       <h3>
    //                         Some task I need to do
    //                         <small className="pull-right">60%</small>
    //                       </h3>
    //                       <div className="progress xs">
    //                         <div className="progress-bar progress-bar-red" style="width: 60%" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
    //                           <span className="sr-only">60% Complete</span>
    //                         </div>
    //                       </div>
    //                     </a>
    //                   </li>
    //                   <li>
    //                     <a href="#">
    //                       <h3>
    //                         Make beautiful transitions
    //                         <small className="pull-right">80%</small>
    //                       </h3>
    //                       <div className="progress xs">
    //                         <div className="progress-bar progress-bar-yellow" style="width: 80%" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
    //                           <span className="sr-only">80% Complete</span>
    //                         </div>
    //                       </div>
    //                     </a>
    //                   </li>
    //                 </ul><div className="slimScrollBar" style="background: rgb(0, 0, 0); width: 3px; position: absolute; top: 0px; opacity: 0.4; display: block; border-radius: 7px; z-index: 99; right: 1px;"></div><div className="slimScrollRail" style="width: 3px; height: 100%; position: absolute; top: 0px; display: none; border-radius: 7px; background: rgb(51, 51, 51); opacity: 0.2; z-index: 90; right: 1px;"></div></div>
    //               </li>
    //               <li className="footer">
    //                 <a href="#">View all tasks</a>
    //               </li>
    //             </ul>
    //           </li>
    //           <li className="dropdown user user-menu">
    //             <a href="#" className="dropdown-toggle" data-toggle="dropdown">
    //               <img src="../../dist/img/user2-160x160.jpg" className="user-image" alt="User Image"/>
    //               <span className="hidden-xs">Alexander Pierce</span>
    //             </a>
    //             <ul className="dropdown-menu">
    //               <li className="user-header">
    //                 <img src="../../dist/img/user2-160x160.jpg" className="img-circle" alt="User Image"/>

    //                 <p>
    //                   Alexander Pierce - Web Developer
    //                   <small>Member since Nov. 2012</small>
    //                 </p>
    //               </li>
    //               <li className="user-body">
    //                 <div className="row">
    //                   <div className="col-xs-4 text-center">
    //                     <a href="#">Followers</a>
    //                   </div>
    //                   <div className="col-xs-4 text-center">
    //                     <a href="#">Sales</a>
    //                   </div>
    //                   <div className="col-xs-4 text-center">
    //                     <a href="#">Friends</a>
    //                   </div>
    //                 </div>
    //               </li>
    //               <li className="user-footer">
    //                 <div className="pull-left">
    //                   <a href="#" className="btn btn-default btn-flat">Profile</a>
    //                 </div>
    //                 <div className="pull-right">
    //                   <a href="#" className="btn btn-default btn-flat">Sign out</a>
    //                 </div>
    //               </li>
    //             </ul>
    //           </li>
    //           <li>
    //             <a href="#" data-toggle="control-sidebar"><i className="fa fa-gears"></i></a>
    //           </li>
    //         </ul>
    //       </div>
    //     </nav>
    //   </header>
  );
};

export default headerAdmin;
