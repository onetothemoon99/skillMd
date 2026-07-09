---
name: bdd
---
# One Wallet Taxi App — BDD Requirements Specification (v2)

**Document Version:** 2.0
**Date:** 2026-04-04
**Product Type:** SaaS White-Label Taxi Platform + Embeddable Wallet Module
**Methodology:** BDD with Impact Mapping, JTBD, Example Mapping, Foundational Prerequisites, and Scenario Dependency Mapping

---

## 1. Impact Map

```
Goal: Build a scalable SaaS taxi platform that generates recurring revenue
│     from taxi operators and wallet app partners
│
├── Actor: Customer (Rider)
│   ├── Impact: Customers book and complete rides with minimal friction
│   │   ├── Feature: On-demand ride booking
│   │   ├── Feature: Real-time driver tracking
│   │   ├── Feature: In-app payment (card, wallet, cash)
│   │   ├── Feature: Ride history and receipts
│   │   ├── Feature: Rating and feedback
│   │   └── Feature: Multi-vehicle type selection
│   ├── Impact: Customers choose the right service for their needs
│   │   ├── Feature: Multiple vehicle types with transparent pricing
│   │   ├── Feature: Ride-sharing / pool option
│   │   ├── Feature: Delivery service
│   │   └── Feature: Fare estimation before booking
│   ├── Impact: Customers return through incentives and convenience
│   │   ├── Feature: Promo codes and discounts
│   │   ├── Feature: Recurring / favorite rides
│   │   ├── Feature: Saved locations
│   │   └── Feature: Customer profile management
│   └── Impact: Wallet app users access taxi without leaving their app
│       ├── Feature: Embeddable taxi module (SDK/Library)
│       ├── Feature: Wallet payment channel integration
│       └── Feature: Seamless user identity passthrough
│
├── Actor: Driver
│   ├── Impact: Drivers earn reliably and manage their work independently
│   │   ├── Feature: Ride request acceptance / rejection
│   │   ├── Feature: Earnings dashboard and payout history
│   │   ├── Feature: Payout management (scheduled + instant)
│   │   └── Feature: Shift management (online/offline toggle)
│   ├── Impact: Drivers complete rides efficiently
│   │   ├── Feature: Turn-by-turn navigation (pickup + destination)
│   │   ├── Feature: Ride status flow (arrived → started → completed)
│   │   ├── Feature: In-app communication with customer
│   │   └── Feature: Multiple stops handling
│   └── Impact: Drivers maintain quality and compliance
│       ├── Feature: Rating visibility and performance metrics
│       ├── Feature: Document upload and verification
│       ├── Feature: Document expiry management
│       └── Feature: Driver profile and vehicle management
│
├── Actor: Admin / Taxi Operator
│   ├── Impact: Operators manage their fleet and operations efficiently
│   │   ├── Feature: Driver management (approval, suspension, documents)
│   │   ├── Feature: Vehicle and fare management
│   │   ├── Feature: Real-time fleet monitoring
│   │   ├── Feature: Ride and dispute management
│   │   └── Feature: Customer management
│   ├── Impact: Operators optimize revenue and pricing
│   │   ├── Feature: Surge pricing configuration
│   │   ├── Feature: Promotion and coupon management
│   │   ├── Feature: Fare structure configuration
│   │   └── Feature: Commission management
│   ├── Impact: Operators make data-driven decisions
│   │   ├── Feature: Revenue dashboards
│   │   ├── Feature: Ride analytics and reports
│   │   ├── Feature: Driver performance reports
│   │   └── Feature: Customer analytics with CSV export
│   └── Impact: Operators control platform configuration
│       ├── Feature: System configuration (zones, hours, policies)
│       ├── Feature: Admin user management with RBAC
│       └── Feature: Admin activity audit log
│
└── Actor: Wallet App Partner (Integration)
    └── Impact: Wallet apps increase engagement by offering taxi services
        ├── Feature: Embeddable taxi module (SDK/Library)
        ├── Feature: Wallet payment channel integration
        └── Feature: Seamless user identity passthrough
```

---

## 2. Job Stories

### Customer Job Stories

**JS-C1:** When I need to get somewhere quickly and don't have my own transport, I want to book a ride from my current location with a few taps, so I can arrive at my destination safely and on time.

**JS-C2:** When I have an important appointment tomorrow morning, I want to schedule a ride in advance and choose my preferred vehicle type, so I don't have to worry about availability at the last minute.

**JS-C3:** When I'm using my wallet app and need a taxi, I want to book a ride without switching apps or re-entering my payment details, so I can get a ride seamlessly within my existing payment flow.

**JS-C4:** When my ride is complete, I want to pay using my preferred method (wallet balance, card, or cash) and receive a digital receipt, so I can track my spending easily.

**JS-C5:** When I regularly commute the same route, I want to set up recurring rides or quickly rebook a favorite route, so I save time on repetitive bookings.

**JS-C6:** When I need to send a package across town, I want to use the same app to book a delivery, so I don't have to find a separate courier service.

### Driver Job Stories

**JS-D1:** When I'm ready to work, I want to go online and receive nearby ride requests with clear pickup details and fare estimates, so I can decide which rides to accept based on profitability.

**JS-D2:** When I've accepted a ride, I want turn-by-turn navigation to the pickup point and then the destination, so I can complete rides efficiently even in unfamiliar areas.

**JS-D3:** When I finish my shift, I want to see a clear breakdown of my earnings, including base fare, tips, bonuses, and commission deductions, so I understand exactly what I've earned.

**JS-D4:** When I'm onboarding as a new driver, I want to submit my documents through the app and track my approval status, so I can start earning as quickly as possible.

**JS-D5:** When I need money urgently, I want to request an instant payout of my accumulated earnings, so I don't have to wait for the weekly payout cycle.

**JS-D6:** When my vehicle registration or insurance is about to expire, I want to be notified in advance and upload renewed documents easily, so I can continue driving without interruption.

### Admin Job Stories

**JS-A1:** When a new driver applies to join the platform, I want to review their documents and approve or reject their application with clear reasons, so I maintain fleet quality standards.

**JS-A2:** When demand spikes in a specific area, I want the system to automatically adjust pricing based on my configured rules, so I maximize revenue while balancing supply and demand.

**JS-A3:** When I need to understand my business performance, I want to view dashboards showing ride volume, revenue, driver utilization, and customer satisfaction trends, so I can make informed operational decisions.

**JS-A4:** When I want to run a promotion to attract new customers, I want to create targeted promo codes with specific rules (expiry, usage limits, minimum fare, eligible areas), so I can control costs while driving growth.

**JS-A5:** When a customer reports a safety issue or disputes a fare, I want to investigate the ride details, contact both parties, and issue adjustments, so I can resolve conflicts fairly and maintain trust.

**JS-A6:** When I'm setting up the platform for a new market, I want to configure service areas, operating hours, fare structures, and cancellation policies, so the system works correctly for my specific operating conditions.

---

## 3. Foundational Prerequisites

Before any of the three epics can function, the following foundational capabilities must exist. These are cross-cutting concerns that all features depend on.

### 3.1 Prerequisite Identification

| # | Foundational Feature | Required By | Description |
|---|---------------------|-------------|-------------|
| F1 | **User Authentication** | All epics | Login, logout, session management, token refresh for customers, drivers, admins |
| F2 | **User Registration & Onboarding** | Customer App, Driver App | Account creation, email/phone verification, profile setup |
| F3 | **Role-Based Access Control (RBAC)** | Admin Portal | Admin roles (super admin, operations, finance, support) with permission matrices |
| F4 | **Notification Infrastructure** | All epics | Push notifications, SMS, email delivery for ride updates, approvals, alerts |
| F5 | **Geolocation Services** | Customer App, Driver App, Admin Portal | GPS tracking, geocoding, reverse geocoding, distance calculation |
| F6 | **Payment Infrastructure** | Customer App, Driver App, Admin Portal | Payment gateway integration, wallet API integration, refund processing |
| F7 | **Audit & Logging** | Admin Portal | Action tracking, admin activity logs, data change history |
| F8 | **Session Management** | All epics | Token-based auth, session expiry, multi-device handling |
| F9 | **File Upload & Storage** | Driver App, Admin Portal | Document upload, image storage, file validation |
| F10 | **Real-Time Communication** | Customer App, Driver App | WebSocket/SSE for live location, ride status updates, chat |
| F11 | **Wallet App Integration Layer** | Customer App (embedded) | SDK authentication, payment API passthrough, identity federation |

### 3.2 Foundational BDD Scenarios

```gherkin
Feature: User Authentication (Customer)
  As a customer, I want to securely log in and maintain my session,
  so that my account and ride data are protected.

  # --- Happy Path ---

  Scenario: Customer registers with phone number and OTP
    Given the customer opens the app for the first time
    When the customer enters phone number "+66812345678"
    And the system sends a 6-digit OTP to that number
    And the customer enters the correct OTP within 5 minutes
    Then the customer account is created
    And the customer is prompted to enter their name and email
    And the customer is logged in with an active session

  Scenario: Customer logs in with existing credentials
    Given a registered customer with email "jane@example.com"
    When the customer enters their email and password
    And the credentials are valid
    Then the customer is logged in
    And the session token is issued with a configured expiry
    And the customer sees the home screen

  Scenario: Customer logs in via wallet app (embedded module)
    Given the customer is authenticated in the wallet app
    When the customer opens the embedded taxi module
    Then the wallet app passes the user's identity token to the taxi SDK
    And the taxi module validates the token against the wallet app's auth provider
    And the customer is automatically logged in without re-entering credentials

  # --- Error / Edge Cases ---

  Scenario: Login fails with incorrect credentials
    Given a registered customer with email "jane@example.com"
    When the customer enters an incorrect password
    Then the system displays "Invalid email or password"
    And the customer can retry

  Scenario: Account locked after multiple failed login attempts
    Given a customer has failed login 5 times in 15 minutes
    When the customer attempts a 6th login
    Then the system displays "Account temporarily locked. Try again in 30 minutes."
    And the customer receives an email/SMS about the lockout

  Scenario: OTP expires before entry
    Given the system sent an OTP to the customer
    When the customer enters the OTP after 5 minutes
    Then the system displays "OTP has expired. Please request a new one."
    And the customer can request a fresh OTP

  Scenario: Session token expires during active use
    Given the customer's session token has expired
    When the customer performs any action in the app
    Then the system attempts a silent token refresh
    And if refresh succeeds, the action proceeds seamlessly
    And if refresh fails, the customer is redirected to the login screen
```

```gherkin
Feature: User Authentication (Driver)
  As a driver, I want to securely log in and maintain my session,
  so that my account, earnings, and ride data are protected.

  Background:
    Given the driver app is installed on the driver's device

  Scenario: Driver registers with phone number and OTP
    Given the driver opens the app for the first time
    When the driver enters phone number "+66898765432"
    And the system sends a 6-digit OTP
    And the driver enters the correct OTP within 5 minutes
    Then the driver account is created with status "Pending Documents"
    And the driver is directed to the document upload screen

  Scenario: Driver logs in with existing credentials
    Given a registered driver with email "ahmed@example.com"
    When the driver enters their email and password
    And the credentials are valid
    Then the driver is logged in
    And if the driver's account is "Approved", the home screen shows the online/offline toggle
    And if the driver's account is "Pending", the home screen shows document status

  Scenario: Driver session persists for active shift
    Given the driver is online and receiving ride requests
    When the driver's session token approaches expiry
    Then the system silently refreshes the token
    And the driver's online status is not interrupted
    And no ride requests are lost during refresh

  # Business rationale: Drivers must not be logged in on multiple devices to prevent ride duplication
  Scenario: Driver logs in on a second device
    Given the driver is already logged in on Device A
    When the driver logs in on Device B
    Then the session on Device A is terminated
    And Device A shows "You have been logged out — session started on another device"
    And the driver is active only on Device B
```

```gherkin
Feature: Admin Authentication and Role-Based Access Control
  As an admin, I want role-based access to the back office portal,
  so that each team member can only access features appropriate to their role.

  # --- Happy Path ---

  Scenario: Super admin logs into the back office portal
    Given a super admin account exists for "sarah@operator.com"
    When the admin enters valid credentials
    Then the admin is logged in
    And the admin has access to all portal features
    And the login event is recorded in the admin activity audit log

  Scenario Outline: Role-based feature access
    Given an admin user with role "<Role>" is logged in
    When the admin navigates to the portal
    Then the admin can access "<Allowed Features>"
    And the admin cannot access "<Restricted Features>"

    Examples:
      | Role          | Allowed Features                                         | Restricted Features                              |
      | Super Admin   | All features                                             | None                                             |
      | Operations    | Driver mgmt, Fleet monitoring, Ride mgmt, Dispatch       | Finance, Commission, Admin user mgmt             |
      | Finance       | Revenue dashboard, Commission, Payouts, Analytics        | Driver mgmt, Fleet monitoring, System config     |
      | Support       | Ride mgmt, Customer mgmt, Dispute resolution             | Pricing, Commission, System config, Admin mgmt   |

  # --- Error / Edge Cases ---

  Scenario: Admin attempts to access unauthorized feature
    Given an admin with role "Support" is logged in
    When the admin tries to navigate to "Surge Pricing Configuration"
    Then the system displays "Access denied — insufficient permissions"
    And the access attempt is logged in the audit trail

  Scenario: Admin session timeout due to inactivity
    Given an admin has been inactive for 30 minutes
    When the admin attempts any action
    Then the admin is redirected to the login screen
    And the system displays "Session expired due to inactivity"
    And any unsaved changes are lost with a warning
```

```gherkin
Feature: Notification Infrastructure
  As the platform, I want to deliver notifications reliably across channels,
  so that customers, drivers, and admins receive timely updates.

  # --- Happy Path ---

  Scenario Outline: System sends notification through appropriate channel
    Given a "<Recipient Type>" has notification preferences configured
    When a "<Trigger Event>" occurs
    Then the system sends a "<Channel>" notification with the appropriate message
    And the notification is logged in the notification history

    Examples:
      | Recipient Type | Trigger Event              | Channel        |
      | Customer       | Driver accepted ride       | Push + In-app  |
      | Customer       | Driver arrived at pickup   | Push + SMS     |
      | Customer       | Ride completed             | Push + Email   |
      | Driver         | New ride request           | Push + Sound   |
      | Driver         | Document approved          | Push + Email   |
      | Driver         | Document expiring in 30d   | Push + Email   |
      | Admin          | Emergency flag on ride     | Push + Email   |
      | Admin          | New driver application     | In-app         |

  Scenario: Notification delivery fails and retries
    Given a push notification fails to deliver (device offline)
    When the system detects the failure
    Then the system retries delivery up to 3 times with exponential backoff
    And if all retries fail, the system falls back to SMS
    And the failed delivery is logged for monitoring

  # Business rationale: Wallet app users receive notifications through the wallet app's own notification system
  Scenario: Notification delivery for embedded wallet module users
    Given the customer is using the taxi service through the wallet app
    When a ride event triggers a notification
    Then the notification is sent via the wallet app's notification API
    And the notification appears within the wallet app's notification center
    And the taxi module's in-app UI also reflects the update
```

```gherkin
Feature: Geolocation Services
  As the platform, I want accurate and reliable location services,
  so that ride matching, tracking, and fare calculation work correctly.

  Scenario: System resolves customer's current GPS location to an address
    Given the customer has enabled location permissions
    When the customer taps "Use current location" for pickup
    Then the system reads the device GPS coordinates
    And the system reverse-geocodes the coordinates to a street address
    And the resolved address is displayed as the pickup location
    And the customer can edit the address if the resolution is inaccurate

  Scenario: System calculates distance and ETA between two points
    Given pickup location "123 Main Street" and destination "456 Business Ave"
    When the system calculates the route
    Then the system returns the estimated distance in km
    And the estimated travel time based on current traffic conditions
    And the fare calculation engine uses these values

  Scenario: GPS accuracy is low
    Given the customer's device reports GPS accuracy > 100 meters
    When the customer attempts to set pickup location
    Then the system shows "Location accuracy is low — please enter your address manually"
    And the customer can type their pickup address
```

```gherkin
Feature: Payment Infrastructure
  As the platform, I want secure and reliable payment processing,
  so that ride fares are collected accurately and drivers are paid correctly.

  Scenario: System processes a card payment through the payment gateway
    Given a completed ride with fare $18.50
    And the customer's payment method is "Visa ending in 4242"
    When the system submits the charge to the payment gateway
    Then the gateway returns a success response with transaction ID
    And the fare is recorded as "Paid" in the ride record
    And the receipt is generated with the transaction reference

  Scenario: System processes a wallet app payment through the partner API
    Given a completed ride booked via the embedded wallet module
    And the fare is $18.50
    When the system calls the wallet partner's payment API
    Then the wallet API returns a success response
    And the fare is deducted from the customer's wallet balance
    And the transaction is recorded in both systems

  Scenario: System processes a refund
    Given a ride was charged $25.00 and the admin issues a full refund
    When the system submits the refund to the payment gateway
    Then the gateway processes the reversal
    And the customer is refunded $25.00 to the original payment method
    And the ride record is updated to "Refunded"

  Scenario: Payment gateway is temporarily unavailable
    Given a completed ride requires payment processing
    When the payment gateway returns a timeout error
    Then the system queues the payment for retry
    And the ride is marked as "Payment Pending"
    And the customer is notified "Payment processing — you'll receive a receipt shortly"
    And the system retries within 5 minutes
```

```gherkin
Feature: Wallet App Integration Layer (SDK)
  As the platform, I want a robust SDK integration layer,
  so that wallet apps can embed the taxi service seamlessly.

  # Business rationale: The SDK is a key revenue channel — wallet partners pay per transaction
  Scenario: Wallet app initializes the taxi SDK with valid credentials
    Given a wallet app partner has valid API credentials (client_id + client_secret)
    When the wallet app initializes the taxi SDK
    Then the SDK authenticates with the taxi platform API
    And the SDK returns a session token
    And the embedded taxi UI is rendered within the wallet app's container

  Scenario: Wallet app passes authenticated user identity
    Given the wallet app user "John" is authenticated in the wallet app
    When the wallet app passes John's identity token to the taxi SDK
    Then the SDK validates the token
    And if a taxi account exists for John, it is linked
    And if no account exists, a new taxi account is created automatically
    And John can book rides without additional registration

  Scenario: SDK authentication fails with invalid credentials
    Given a wallet app provides invalid API credentials
    When the wallet app attempts to initialize the taxi SDK
    Then the SDK returns an authentication error
    And the embedded taxi UI shows "Service temporarily unavailable"
    And the error is logged in the platform monitoring system

  Scenario: Wallet app partner's API credentials are revoked
    Given a wallet partner's credentials have been revoked by the admin
    When the wallet app attempts to initialize the taxi SDK
    Then the SDK returns "Partner account suspended"
    And no taxi services are available through this wallet app
```

---

## 4. Example Maps

### 4.1 Customer App — Ride Booking

```
STORY: Customer books an on-demand ride
─────────────────────────────────────────────────────────────
RULE: R-C1 — Customer must set pickup and destination before booking
  ├── Example: Customer sets both locations → fare estimate shown, book button enabled
  ├── Example: Customer sets only pickup → book button disabled, prompt for destination
  └── Example: Customer uses "current location" as pickup → GPS resolves address automatically

RULE: R-C2 — Fare estimate is shown before booking confirmation
  ├── Example: Normal demand → standard fare estimate displayed (e.g., $12-15)
  ├── Example: Surge pricing active → surge multiplier shown (e.g., "1.5x — $18-22")
  └── Example: Route unavailable → "Route not available" message

RULE: R-C3 — System matches nearest available driver after booking
  ├── Example: 3 drivers within 2km → nearest driver receives request first
  ├── Example: No drivers available within radius → "No drivers available, try again shortly"
  └── Example: Driver doesn't respond within timeout → request forwarded to next nearest driver

RULE: R-C4 — Customer can cancel a ride with applicable fees
  ├── Example: Cancel within 30 seconds of booking → free cancellation
  ├── Example: Cancel after driver is en route (>2 min) → cancellation fee applied
  └── Example: Cancel after driver arrives at pickup → higher cancellation fee

QUESTION: Q1 — What is the driver search radius and timeout per request?
QUESTION: Q2 — Is there a maximum number of concurrent bookings per customer?
QUESTION: Q3 — Can customers book for someone else (third-party booking)?
```

### 4.2 Customer App — Payment

```
STORY: Customer pays for a completed ride
─────────────────────────────────────────────────────────────
RULE: R-C5 — Multiple payment methods supported (wallet, card, cash)
  ├── Example: Customer pays with saved card → charge processed, receipt generated
  ├── Example: Customer pays with wallet balance → balance deducted, receipt generated
  ├── Example: Customer selects cash → driver collects cash, ride marked as cash payment
  └── Example: Customer pays via integrated wallet app → wallet API processes payment

RULE: R-C6 — Payment method must be selected before ride starts
  ├── Example: Customer has no payment method → prompted to add one before confirming ride
  └── Example: Customer in wallet-embedded mode → wallet balance is default payment method

RULE: R-C7 — Receipts are generated automatically after payment
  ├── Example: Completed ride → receipt with fare breakdown emailed and shown in-app
  └── Example: Cash ride → receipt shows fare but payment marked as "cash collected"

QUESTION: Q4 — Can customers split payment between methods?
QUESTION: Q5 — How is tipping handled? Is it in-app or cash only?
QUESTION: Q6 — What happens if a card payment fails after the ride is completed?
```

### 4.3 Customer App — Scheduling and Recurring Rides

```
STORY: Customer schedules a ride in advance
─────────────────────────────────────────────────────────────
RULE: R-C8 — Rides can be scheduled at least 30 minutes in advance
  ├── Example: Customer schedules for 2 hours later → booking confirmed
  ├── Example: Customer tries to schedule 10 minutes from now → rejected
  └── Example: Customer schedules for next week → confirmed, reminder sent 1 hour before

RULE: R-C9 — Recurring rides follow a repeating pattern
  ├── Example: Customer sets "weekdays at 8:00 AM" → system auto-books every Mon-Fri
  ├── Example: Customer cancels one instance → only that instance cancelled
  └── Example: No driver available for a recurring ride → customer notified 15 min before

QUESTION: Q7 — How far in advance can rides be scheduled (max)?
QUESTION: Q8 — Can fare estimates for scheduled rides change (e.g., surge at time of ride)?
QUESTION: Q9 — What is the cancellation policy for scheduled rides?
```

### 4.4 Driver App — Ride Management

```
STORY: Driver receives and completes a ride
─────────────────────────────────────────────────────────────
RULE: R-D1 — Driver must be online to receive ride requests
  ├── Example: Driver toggles online → location tracked, eligible for requests
  ├── Example: Driver toggles offline → no requests, current ride unaffected
  └── Example: Driver app background for >5min → auto-offline with notification

RULE: R-D2 — Driver can accept or decline ride requests within a time window
  ├── Example: Driver accepts within 15s → ride assigned
  ├── Example: Driver doesn't respond in 15s → request moves to next driver
  └── Example: Driver declines 3 in a row → warning about acceptance rate

RULE: R-D3 — Ride progresses through defined statuses
  ├── Example: Accepts → "En route to pickup"
  ├── Example: Arrives → "Waiting for rider"
  ├── Example: Rider boards → "In progress"
  └── Example: Arrives at destination → "Completed", fare calculated

RULE: R-D4 — Driver can contact customer via in-app methods
  ├── Example: Taps call → masked phone call initiated
  └── Example: Sends message → in-app chat delivered

QUESTION: Q10 — What is the acceptance rate threshold before penalties?
QUESTION: Q11 — Can drivers set preferred zones or destinations?
QUESTION: Q12 — Maximum wait time at pickup before driver can cancel?
```

### 4.5 Driver App — Earnings and Onboarding

```
STORY: Driver views earnings and manages their account
─────────────────────────────────────────────────────────────
RULE: R-D5 — Earnings are tracked per ride and aggregated daily/weekly
  ├── Example: Completes ride → breakdown shown (base + distance + time - commission)
  ├── Example: Weekly summary → total earnings, rides, hours, tips
  └── Example: Received tip → shown separately, no commission on tips

RULE: R-D6 — Payouts are processed on a defined schedule
  ├── Example: Weekly payout day → earnings transferred to bank
  ├── Example: Instant payout request → processed with small fee
  └── Example: Payout fails → driver notified, asked to update bank info

RULE: R-D7 — New drivers must submit and pass document verification
  ├── Example: Uploads all docs → status: "Under review"
  ├── Example: Admin approves → status: "Approved", can go online
  ├── Example: Admin rejects → notified with reason, can re-upload
  └── Example: Document expires → notified 30 days before

QUESTION: Q13 — What is the commission structure (flat fee vs. percentage)?
QUESTION: Q14 — Are there bonuses (e.g., complete 20 rides for $50 bonus)?
QUESTION: Q15 — What documents are required per jurisdiction?
```

### 4.6 Admin Back Office — Fleet and Operations

```
STORY: Admin manages drivers, vehicles, and operations
─────────────────────────────────────────────────────────────
RULE: R-A1 — Admin can approve, suspend, or deactivate drivers
  ├── Example: New driver with valid docs → approve, driver goes online
  ├── Example: Safety complaint → suspend pending investigation
  └── Example: Deactivate → driver cannot go online, notified

RULE: R-A2 — Admin can manage vehicle types and fare structures
  ├── Example: Create "SUV" with base $5, per-km $2 → saved
  ├── Example: Update Economy per-km rate → new rides use new rate
  └── Example: Disable "Luxury" → no longer shown to customers

RULE: R-A3 — Admin can view and manage active rides in real-time
  ├── Example: Live map → all active rides with status indicators
  ├── Example: Click ride → details shown
  └── Example: Emergency → admin contacts driver immediately

QUESTION: Q16 — Can there be multiple admin roles (super admin, operations, finance)?
QUESTION: Q17 — Is there a dispute resolution workflow?
QUESTION: Q18 — Multi-tenant views (operator sees only their data)?
```

### 4.7 Admin Back Office — Pricing, Promotions, and Analytics

```
STORY: Admin configures pricing and runs promotions
─────────────────────────────────────────────────────────────
RULE: R-A4 — Surge pricing is configurable per zone and time
  ├── Example: Set rule: >80% utilization → 1.5x → rule active
  ├── Example: Surge activates → customers see indicator
  └── Example: Disable surge → standard pricing applies

RULE: R-A5 — Admin can create and manage promotional campaigns
  ├── Example: Create "WEEKEND20" → 20% off, Sat-Sun, max 100 uses
  ├── Example: Promo reaches limit → auto-deactivated
  └── Example: Create area-specific promo → only rides in Zone B

RULE: R-A6 — Analytics dashboards show key business metrics
  ├── Example: Revenue dashboard → daily/weekly/monthly trends
  ├── Example: Ride analytics → completed, cancelled, avg fare
  └── Example: Export to CSV → file downloaded

QUESTION: Q19 — Should surge be fully automatic or require admin approval?
QUESTION: Q20 — Analytics data retention period?
QUESTION: Q21 — Predefined report templates or custom dashboards?
```

### 4.8 System Configuration

```
STORY: Admin configures the platform for their market
─────────────────────────────────────────────────────────────
RULE: R-A7 — Service areas and zones are configurable
  ├── Example: Draw polygon on map → new zone created
  ├── Example: Disable zone → rides cannot start/end in that area
  └── Example: Set zone-specific pricing → fares differ by zone

RULE: R-A8 — Operating hours are configurable
  ├── Example: Set hours 6AM-midnight → no bookings outside hours
  └── Example: 24/7 operation → no restrictions

RULE: R-A9 — Cancellation policies are configurable
  ├── Example: Free window = 2 min, fee after = $5 → applied to all cancellations
  └── Example: No-show wait time = 5 min → driver can cancel after wait

RULE: R-A10 — Driver matching parameters are configurable
  ├── Example: Search radius = 5km, timeout = 15s → used for matching
  └── Example: Increase radius to 10km in low-demand areas

QUESTION: Q22 — Can zones overlap? How are overlapping zone fares resolved?
QUESTION: Q23 — Can operating hours vary by zone?
QUESTION: Q24 — Are cancellation policies configurable per vehicle type?
```

---

## 5. BDD Scenarios (Gherkin)

---

### EPIC 1: CUSTOMER APP

_(Customer app scenarios follow — covering ride booking, tracking, cancellation, payment, scheduling, rating, promos, history, delivery, ride-sharing, vehicle selection, and profile management)_


```gherkin
Feature: Ride Booking (On-Demand)
  As a customer
  I want to book an on-demand ride with flexible pickup and destination selection
  So that I can get transportation when I need it

  Background:
    Given the customer is authenticated and logged into the app
    And the customer has a valid payment method on file (wallet or card)
    And the customer's location service is enabled
    And no ride is currently in progress

  # --- Happy Path ---

  Scenario: Customer books a ride with confirmed fare estimate
    When the customer enters pickup location as current location
    And the customer enters destination "123 Main St, Downtown"
    And the customer selects ride type "Standard"
    And the app displays fare estimate $18.50 for 12 minutes
    And the customer confirms the booking
    Then the ride booking is confirmed with booking reference
    And the customer receives booking confirmation via push notification
    And the app displays "Matching with drivers"

  # Business rationale: Surge pricing must be visible before commitment to maintain trust
  Scenario: Customer books during surge pricing period
    Given surge pricing is active with 1.5x multiplier
    When the customer enters pickup location and destination
    And the app displays base fare $12.00, surge multiplier 1.5x, total $18.00
    And a banner displays "High demand — prices increased by 50%"
    And the customer confirms booking with surge price acknowledged
    Then the ride is booked at the surge rate
    And the receipt shows itemized base fare and surge charge

  # --- Alternative Paths ---

  Scenario: Customer books with manual pickup location entry
    When the customer enters manual pickup address "456 Park Ave"
    And the app validates the pickup address is serviceable
    And the customer enters destination "789 Commerce Blvd"
    And fare estimate displays $22.50
    And the customer confirms the booking
    Then the pickup location is set to manual address
    And the driver will be directed to the manual pickup location

  # Business rationale: Embedded module is core for wallet partnership revenue
  Scenario: Customer books ride from embedded wallet app module
    Given the customer is using a third-party wallet app with embedded taxi module
    And the customer's wallet identity is passed through to the taxi service
    When the customer enters destinations in the wallet app taxi widget
    And the app displays fare $16.75 with wallet payment pre-selected
    And the customer confirms booking in the embedded module
    Then the booking is created in the taxi system
    And the wallet app receives booking confirmation and tracking data

  Scenario: Customer books ride with multiple stops
    When the customer sets primary destination "Office Building A"
    And the customer adds a stop at "Coffee Shop on 5th"
    And the customer sets final destination "Home, Riverside"
    And the app recalculates fare for multi-stop route $28.50
    And the customer confirms the multi-stop booking
    Then the booking includes all locations in sequence
    And the driver receives complete route in app

  # --- Error / Edge Cases ---

  Scenario: Customer attempts to book from unserviceable area
    When the customer selects pickup location outside service area
    Then the app displays "Service not available in this area"
    And the customer cannot proceed with booking
    And the customer is offered nearby serviceable locations

  Scenario: No drivers available in the area
    When the customer confirms ride booking
    And no drivers are available in the area
    Then the app displays "No drivers available at this time"
    And the customer is offered option to schedule ride for later
    And the booking can be cancelled without penalty

  Scenario: Driver acceptance times out during matching
    Given the customer's ride is in matching phase
    And the app has offered ride to 3 drivers
    And no driver accepts within 2 minutes
    Then the app cancels the booking
    And the customer receives notification "No driver accepted — ride cancelled"
    And the customer can book a new ride immediately

  Scenario: Customer tries to book without destination
    Given the customer has set a pickup location
    But the customer has not set a destination
    When the customer taps "Book Ride"
    Then the booking button is disabled
    And the system prompts "Please enter your destination"
```

```gherkin
Feature: Real-Time Ride Tracking
  As a customer
  I want to track my driver and ride in real-time
  So that I know when my driver will arrive and where I am going

  Background:
    Given the customer is authenticated and logged in
    And an active ride booking exists with confirmed driver
    And GPS is enabled on customer's device

  # --- Happy Path ---

  Scenario: Customer tracks driver approaching pickup
    Given the ride status is "Driver en route to pickup"
    When the customer views the ride screen
    Then the map shows the driver's real-time location with vehicle icon
    And the estimated arrival time to pickup is displayed
    And the driver's name, vehicle type, and license plate are shown
    And the display updates every few seconds

  Scenario: Customer tracks ride in progress
    Given the driver has picked up the customer and ride is in progress
    When the customer views the active ride screen
    Then the map shows current position along the route
    And the estimated time to destination is displayed
    And the route path is highlighted on the map

  # --- Alternative Path ---

  Scenario: Customer shares live ride status with a contact
    Given the ride is in progress
    When the customer taps "Share Trip"
    And selects a contact from their phone
    Then the app generates a shareable tracking link
    And the contact can view live ride location in a browser without logging in

  # --- Error / Edge Cases ---

  # Business rationale: GPS loss must be handled gracefully to prevent customer alarm
  Scenario: GPS signal temporarily lost during ride
    Given a ride is in progress with real-time tracking
    When GPS signal is lost for more than 60 seconds
    Then the app displays last known location with notice "Location updating..."
    And the customer can contact driver via in-app calling
    And when GPS returns, tracking resumes seamlessly

  Scenario: Tracking with poor network connection
    Given the customer's network is intermittent
    When location updates are delayed
    Then the app displays "Low connection" warning
    And shows the last confirmed location
    And resumes normal updates when connectivity improves
```

```gherkin
Feature: Ride Cancellation
  As a customer
  I want to cancel rides at different stages with clear information about fees
  So that I only pay for completed services

  Background:
    Given the customer is authenticated and logged in
    And a ride booking exists in the system

  # --- Happy Path ---

  Scenario: Customer cancels before driver accepts
    Given ride is in "Searching for drivers" state
    When the customer taps "Cancel Ride"
    Then the ride is immediately cancelled
    And no cancellation fee is charged

  Scenario: Customer cancels within free cancellation window
    Given a driver has been matched within the last 2 minutes
    When the customer taps "Cancel Ride" and confirms
    Then the driver receives cancellation notification
    And no fee is charged

  # --- Alternative Paths ---

  # Business rationale: Progressive fees reduce revenue loss while allowing flexibility
  Scenario Outline: Cancellation fees based on ride stage
    Given a ride is in "<Stage>" with driver "<Driver Status>"
    When the customer cancels the ride
    Then a cancellation fee of "<Fee>" is applied

    Examples:
      | Stage           | Driver Status       | Fee              |
      | Just matched    | En route (<2 min)   | $0               |
      | En route        | En route (>2 min)   | $5.00            |
      | Driver arrived  | At pickup location  | $8.00            |
      | In progress     | Ride started        | 50% of est. fare |

  Scenario: Driver cancels confirmed ride
    Given the customer has an active booking with assigned driver
    When the driver cancels for operational reasons
    Then the customer is not charged any fee
    And the app offers to automatically rebook
    And the customer receives a ride credit for inconvenience

  # --- Error / Edge Cases ---

  # Business rationale: Excessive cancellations waste driver time and reduce platform reliability
  Scenario: Customer has excessive cancellations
    Given the customer has cancelled 3 rides in the past hour
    When the customer attempts to book another ride
    Then the system shows "You have cancelled multiple rides recently"
    And a warning about potential account review is displayed
    And the customer can still proceed with booking

  Scenario: Customer attempts to cancel completed ride
    Given the ride has completed and payment is processing
    When the customer requests cancellation
    Then the app displays "Ride already completed — cancellation not available"
    And the customer can dispute the charge through support
```

```gherkin
Feature: Ride Payment
  As a customer
  I want to pay for my ride using multiple payment methods
  So that I have flexibility and security in my transactions

  Background:
    Given the customer is authenticated and logged in
    And a ride has been completed with a calculated fare

  # --- Happy Path ---

  Scenario: Customer pays with saved credit card
    Given the fare is $18.50
    And the payment method is "Visa ending in 4242"
    When the ride completes
    Then $18.50 is charged to the card
    And a receipt is generated with fare breakdown (base, distance, time, fees)
    And the receipt is available in-app and sent via email

  Scenario: Customer pays with wallet balance (standalone app)
    Given the customer has a wallet balance of $50.00
    And the payment method is "Wallet"
    When the ride completes with fare $18.50
    Then $18.50 is deducted from the wallet balance
    And the remaining balance shown is $31.50

  Scenario: Customer pays via wallet app API (embedded module)
    Given the customer booked through the wallet app's embedded taxi module
    And the wallet app's payment API is the default payment channel
    When the ride completes with fare $18.50
    Then the system calls the wallet API to charge $18.50
    And the transaction appears in the wallet app's history
    And a receipt is generated within the taxi module

  Scenario: Customer pays with cash
    Given the customer selected "Cash" before the ride started
    When the ride completes
    Then the driver is notified to collect $18.50 in cash
    And the ride is marked as "Cash payment"
    And a receipt is generated

  # --- Alternative Path ---

  Scenario: Customer adds tip after ride
    Given the ride payment has been processed
    When the customer views the ride summary
    Then tip options are shown (10%, 15%, 20%, custom)
    And when the customer selects 20% tip ($3.70)
    Then the tip is charged to the same payment method
    And the driver's earnings reflect the tip separately (no commission on tip)

  # --- Error / Edge Cases ---

  Scenario: Card payment fails after ride completion
    Given the customer's card is declined
    When the system attempts to charge the fare
    Then the ride is marked as "Payment Pending"
    And the customer is notified "Payment failed. Please update your payment method."
    And the customer cannot book new rides until resolved

  Scenario: Insufficient wallet balance
    Given the wallet balance is $5.00 and the fare is $12.50
    When payment is attempted with wallet balance
    Then the app displays "Insufficient balance ($5.00 available, $12.50 needed)"
    And the customer is prompted to use an alternative payment method

  Scenario: Customer has no payment method configured
    Given the customer has no saved payment method
    When the customer attempts to confirm a booking
    Then the system prompts "Add a payment method to continue"
    And the booking is not submitted until a valid method is added
```

```gherkin
Feature: Scheduled and Recurring Rides
  As a customer
  I want to schedule rides in advance and set up recurring bookings
  So that I can plan my travel and save time on repetitive trips

  Background:
    Given the customer is authenticated and logged in
    And the customer has a valid payment method on file

  # --- Happy Path ---

  Scenario: Customer schedules a ride for later today
    Given the current time is 09:00 AM
    When the customer sets pickup, destination, and scheduled time to 02:00 PM
    And confirms the scheduled booking
    Then the ride is confirmed for 02:00 PM
    And a reminder is sent at 01:00 PM (1 hour before)
    And another reminder at 01:45 PM (15 min before)

  # Business rationale: Recurring rides improve daily revenue predictability
  Scenario: Customer sets up a recurring weekday ride
    Given the customer sets pickup to "Home" and destination to "Office"
    When the customer selects "Recurring" with schedule "Weekdays at 8:00 AM"
    And confirms the recurring booking
    Then the system creates ride bookings for each weekday at 8:00 AM
    And the customer can view and manage all upcoming instances

  # --- Alternative Paths ---

  Scenario: Customer cancels one instance of a recurring ride
    Given the customer has a recurring weekday ride
    When the customer cancels the instance for next Monday
    Then only the Monday instance is cancelled
    And all other weekday instances remain active

  Scenario: Customer edits the recurring ride schedule
    Given the customer has a recurring ride at 8:00 AM
    When the customer changes the time to 8:30 AM
    Then all future instances are updated to 8:30 AM
    And past completed instances are unaffected

  # --- Error / Edge Cases ---

  # Business rationale: Minimum advance prevents operational issues
  Scenario: Customer tries to schedule less than 30 minutes ahead
    Given the current time is 09:00 AM
    When the customer attempts to schedule for 09:15 AM
    Then the system displays "Scheduled rides must be at least 30 minutes in advance"
    And suggests the next available time

  Scenario: No driver available for a scheduled ride
    Given a ride is scheduled for 02:00 PM
    And no drivers are available at that time
    When the scheduled time arrives
    Then the customer is notified "We couldn't find a driver for your scheduled ride"
    And the ride is cancelled with no charge
```

```gherkin
Feature: Post-Ride Rating and Feedback
  As a customer
  I want to rate my driver and provide feedback
  So that I can help maintain service quality

  Background:
    Given the customer is authenticated and logged in
    And a ride has been completed within the last 7 days

  # --- Happy Path ---

  Scenario: Customer rates the driver after completing a ride
    When the ride summary screen is displayed
    And the customer selects a 4-star rating
    And optionally enters a comment
    And submits the rating
    Then the rating is recorded against the driver
    And the driver is notified of the feedback

  # Business rationale: Low ratings with mandatory reason enable targeted driver improvement
  Scenario: Customer provides a low rating with mandatory reason
    When the customer selects a 1-star rating
    Then the system prompts the customer to select a reason from:
      "Safety concern", "Poor route", "Vehicle condition", "Driver behavior", "Other"
    And the customer selects a reason and adds a comment
    And the feedback is flagged for admin review

  # --- Alternative Paths ---

  Scenario: Customer skips the rating prompt
    When the customer dismisses the rating prompt
    Then the ride is marked as "Unrated"
    And the customer is reminded on their next app open within 48 hours

  Scenario: Customer rates vehicle condition separately
    When the rating screen appears
    And the customer taps "Rate vehicle condition"
    And selects cleanliness rating (1-5 stars)
    Then the vehicle feedback is recorded separately
    And low ratings notify the vehicle maintenance team

  # --- Edge Case ---

  # Business rationale: Prevents outdated feedback from skewing metrics
  Scenario: Rating window expires after 7 days
    Given the ride was completed more than 7 days ago
    When the customer attempts to rate
    Then the system displays "Rating period has expired for this ride"
```

```gherkin
Feature: Promotional Code Application
  As a customer
  I want to apply promo codes to get discounts on my rides
  So that I can save money and take advantage of offers

  Background:
    Given the customer is authenticated and logged in
    And a ride is being booked with an estimated fare

  # --- Happy Path ---

  Scenario: Customer applies a valid percentage promo code
    Given the estimated fare is $20.00
    And promo code "SAVE10" offers 10% off with no minimum fare
    When the customer enters "SAVE10"
    Then the discount of $2.00 is applied
    And the updated fare estimate shows $18.00

  # --- Error / Edge Cases ---

  Scenario Outline: Invalid promo code scenarios
    Given the estimated fare is $<Fare>
    When the customer enters promo code "<Code>"
    Then the system displays "<Message>"
    And no discount is applied

    Examples:
      | Code     | Fare  | Message                                        |
      | SUMMER20 | 20.00 | This promo code has expired                    |
      | BIG25    | 15.00 | Minimum fare of $30.00 required for this promo |
      | FIRST50  | 20.00 | You have already used this promo code          |
      | FLASH    | 20.00 | This promo code is no longer available          |

  Scenario: Customer attempts to stack multiple promo codes
    Given the customer has applied promo code "SAVE10" successfully
    When the customer tries to add a second promo code
    Then the app displays "Only one promo code can be applied per ride"
    And the second code is rejected
    And the first promo remains active
```

```gherkin
Feature: Ride History and Saved Locations
  As a customer
  I want to view my ride history and manage saved locations
  So that I can track past rides and quickly book frequent trips

  Background:
    Given the customer is authenticated and logged in

  # --- Happy Path ---

  Scenario: Customer views ride history
    When the customer navigates to "My Rides"
    Then the system displays past rides sorted by date (most recent first)
    And each ride shows date, pickup, destination, fare, driver name, and rating
    And the list is paginated for older rides

  Scenario: Customer views a ride receipt
    When the customer taps on a completed ride
    Then the full receipt is shown with fare breakdown
    And the customer can download or share the receipt as PDF

  # --- Alternative Paths ---

  Scenario: Customer saves a favorite location
    When the customer adds "Office" as a saved location with address "456 Business Ave"
    Then "Office" appears in the quick-select location list for future bookings

  # Business rationale: One-tap rebooking increases ride frequency
  Scenario: Customer rebooks a previous ride
    Given the customer views a past ride from "Home" to "Airport"
    When the customer taps "Rebook this ride"
    Then the booking form is pre-filled with the same pickup, destination, and vehicle type
    And the customer sees an updated fare estimate for current conditions

  Scenario: Customer filters ride history
    When the customer taps "Filter"
    And selects date range "Last 30 days"
    Then the history displays only rides matching the filter
```

```gherkin
Feature: Delivery Service
  As a customer
  I want to send packages via the taxi app
  So that I can get items delivered without traveling myself

  Background:
    Given the customer is authenticated and logged in
    And delivery service is enabled for the customer's area

  # --- Happy Path ---

  Scenario: Customer books a delivery
    Given the customer selects "Delivery" as service type
    And sets pickup to "123 Main Street" and delivery to "789 Oak Lane"
    And enters package details: "Small parcel, documents"
    When the customer confirms the booking
    Then the system matches a nearby driver
    And the customer receives driver details and ETA for pickup

  Scenario: Customer tracks delivery in real-time
    Given an active delivery with assigned driver
    When the customer views the delivery screen
    Then the map shows the driver's real-time location
    And estimated delivery time is displayed
    And notifications arrive at each stage (pickup, in transit, delivered)

  Scenario: Delivery completed with confirmation
    Given the driver has arrived at the delivery destination
    When the driver marks the delivery as completed
    Then the customer receives notification "Your package has been delivered"
    And the delivery appears in ride history with type "Delivery"

  # --- Edge Case ---

  Scenario: Recipient unavailable for delivery
    Given the driver arrived at delivery destination
    And the recipient is unavailable
    Then the customer is notified about failed delivery
    And offered options: redeliver later, pickup at station, return to sender
```

```gherkin
Feature: Ride Sharing (Pool)
  As a customer
  I want to share my ride with other passengers going the same way
  So that I can reduce my fare and travel more affordably

  Background:
    Given the customer is authenticated and logged in
    And ride-sharing is enabled in the customer's area

  # --- Happy Path ---

  Scenario: Customer books a shared ride at a discounted fare
    Given the estimated solo fare is $20.00
    When the customer selects "Pool" ride type
    Then the system shows a discounted estimate of "$12-14"
    And a note reads "Fare may vary based on matched riders"

  Scenario: System matches multiple riders on a shared ride
    Given customer "Jane" booked a pool ride from A to B
    And customer "Tom" booked a pool ride from A' (nearby) to B' (same direction)
    When the system identifies a compatible route
    Then both riders are matched to the same driver
    And each rider sees the other pickup/dropoff as waypoints

  # --- Alternative Path ---

  Scenario: No other riders matched for pool ride
    Given customer "Jane" booked a pool ride
    And no compatible riders are found within the matching window
    When the window expires
    Then the ride proceeds as single-rider pool at the discounted fare
    And the customer is informed "No other riders matched — you still get the pool rate"

  # --- Edge Case ---

  Scenario: One pooled rider cancels before pickup
    Given a pool ride has 2 matched riders
    When Rider B cancels within free cancellation window
    Then Rider A is charged solo rate instead of pool rate
    And Rider A is notified about the rate change
    And the driver receives an updated route
```

```gherkin
Feature: Multi-Vehicle Type Selection
  As a customer
  I want to choose from different vehicle types based on my needs
  So that I can select the most appropriate ride for my situation

  Background:
    Given the customer is authenticated and logged in
    And a pickup and destination have been selected

  # --- Happy Path ---

  Scenario: Customer views available vehicle types with pricing
    When the customer views the ride type selection
    Then all available vehicle types are displayed with:
      | Vehicle Type | Est. Fare | ETA   |
      | Economy      | $12.00    | 5 min |
      | Comfort      | $16.50    | 6 min |
      | SUV          | $22.00    | 7 min |
      | Premium      | $35.00    | 8 min |
    And each type shows vehicle photo and average driver rating

  Scenario: Customer selects a specific vehicle type
    When the customer selects "Comfort"
    And confirms booking
    Then a driver with a Comfort-registered vehicle is matched
    And the booking confirmation shows the vehicle type

  # --- Error / Edge Cases ---

  # Business rationale: Unavailable types must be communicated to avoid frustration
  Scenario: Selected vehicle type currently unavailable
    When the customer selects "Premium"
    And no Premium vehicles are available
    Then the app displays "Premium not available right now"
    And shows estimated wait time
    And offers alternatives (Comfort, SUV) with prices
    And the customer can choose an alternative or wait

  Scenario: Accessibility vehicle request
    When the customer selects "Wheelchair accessible required"
    Then the system filters to accessible vehicles only
    And matches a driver with an accessible vehicle
```

```gherkin
Feature: Customer Profile Management
  As a customer
  I want to manage my profile, payment methods, and preferences
  So that I can control my account and customize my experience

  Background:
    Given the customer is authenticated and logged in

  # --- Happy Path ---

  Scenario: Customer updates personal information
    When the customer updates their name, email, or phone number
    And saves changes
    Then the profile is updated
    And if email changed, a verification link is sent to the new email

  # Business rationale: Multiple payment methods are critical for failed payment recovery
  Scenario: Customer adds a new payment method
    When the customer adds a new card
    And the card passes verification
    Then the card is saved to payment methods
    And the customer can set it as the default

  Scenario: Customer manages saved addresses
    When the customer adds a new location "Gym" at "789 Fitness Ave"
    Then the location appears in saved locations for quick booking

  Scenario: Customer customizes notification preferences
    When the customer toggles notification types:
      | Type                    | Enabled |
      | Booking confirmations   | ON      |
      | Driver approaching      | ON      |
      | Promotional offers      | OFF     |
    Then only enabled notification types are sent

  # --- Error / Edge Cases ---

  Scenario: Payment card verification fails
    When the customer adds a card that fails verification
    Then the app displays "Card verification failed"
    And suggests possible reasons
    And the card is not saved until verification succeeds

  # Business rationale: Account deletion must comply with data retention regulations
  Scenario: Customer requests account deletion
    When the customer selects "Delete account"
    And confirms by entering their password
    Then the account becomes inactive immediately
    And after a 30-day grace period, the account is permanently deleted
    And the customer is informed of the grace period
```


---

### EPIC 2: DRIVER APP

```gherkin
Feature: Driver Availability Management
  As a driver, I want to control when I am available for ride requests,
  so that I can manage my working hours and personal time.

  Background:
    Given driver "Ahmed" is logged into the driver app
    And the driver's account is approved and active
    And the driver has valid documents that are not expired
    And the driver's bank account is verified

  # --- Happy Path ---
  Scenario: Driver goes online to receive ride requests
    When the driver toggles the availability switch to "Online"
    Then the driver's status is set to "Available"
    And the system begins tracking the driver's location
    And the driver is eligible to receive ride requests
    And the driver sees "You are online" confirmation

  Scenario: Driver goes offline
    Given the driver is online with no active ride
    When the driver toggles the availability switch to "Offline"
    Then the driver's status is set to "Offline"
    And the driver stops receiving ride requests
    And location tracking stops
    And the system records the offline timestamp

  # --- Alternative Paths ---
  Scenario: Driver goes offline while on an active ride
    Given the driver has an active ride in progress
    And the ride is in "In progress" status
    When the driver toggles to "Offline"
    Then the current ride continues uninterrupted
    And the driver will not receive new requests after this ride completes
    And the offline status takes effect once the current ride ends

  # Business rationale: Prevents ghost drivers who appear available but never respond
  # --- Error/Edge Cases ---
  Scenario: Driver auto-set to offline after prolonged inactivity
    Given the driver is online
    And the driver's app has been in the background for more than 5 minutes without movement
    When the inactivity timeout triggers
    Then the driver is automatically set to "Offline"
    And a push notification reads "You've been set offline due to inactivity"

  Scenario: Driver tries to go online with expired documents
    Given the driver is offline
    And the driver's "Driver's License" document has expired
    When the driver attempts to toggle online
    Then the system blocks the action
    And the driver sees message "Your Driver's License has expired. Please upload a renewed document before going online."
    And the toggle remains in the "Offline" position

  Scenario: Driver attempts to go online with unverified bank account
    Given the driver is offline
    And the driver's bank account has not been verified
    When the driver attempts to toggle online
    Then the system blocks the action
    And the driver sees message "Please verify your bank account in Settings before going online."


Feature: Ride Request Acceptance and Decline
  As a driver, I want to see ride request details and decide whether to accept,
  so that I can choose rides that are profitable and convenient for me.

  Background:
    Given driver "Ahmed" is logged in
    And the driver is online and available
    And the driver has a valid document status
    And a new ride request is received for the driver

  # --- Happy Path ---
  Scenario: Driver accepts a ride request within the time limit
    Given the ride request shows pickup "123 Main Street" (0.8 km away), destination "Airport", estimated fare "$25"
    When the driver taps "Accept" within 15 seconds
    Then the ride is assigned to the driver
    And the driver sees customer details (name, pickup location, contact, customer rating)
    And the ride status changes to "En route to pickup"
    And the customer is notified with the driver's details (name, vehicle, license plate)
    And the acceptance rate tracker is updated

  Scenario: Driver accepts a ride and views full details
    Given a ride request is displayed with basic info
    When the driver taps "Accept"
    Then the driver navigates to the active ride screen
    And the ride details include: pickup address, destination address, estimated fare, estimated distance, estimated time

  # --- Alternative Paths ---
  Scenario: Driver declines a ride request
    Given a ride request is displayed
    When the driver taps "Decline"
    Then the request is forwarded to the next nearest available driver
    And the decline is recorded against the driver's acceptance rate
    And the driver's view returns to the available rides queue

  # Business rationale: Consistently declining rides degrades customer experience and fleet reliability
  Scenario: Driver does not respond within the timeout
    Given a ride request is displayed
    And the driver has 15 seconds to respond
    When 15 seconds pass without a response
    Then the request is automatically forwarded to the next driver
    And the driver sees "Request timed out — forwarded to another driver"
    And the timeout is recorded against the driver's acceptance rate
    And the driver remains online and eligible for other requests

  Scenario: Driver receives a warning after consecutive declines
    Given the driver has declined 3 consecutive ride requests
    When the third decline is recorded
    Then the driver sees a warning dialog "Your acceptance rate is low. Consistently declining rides may affect your account status."
    And the warning includes the current acceptance rate percentage
    And the driver can dismiss the warning

  # --- Error/Edge Cases ---
  Scenario: Driver accepts ride but connection drops temporarily
    Given a ride request is displayed
    And the driver taps "Accept"
    And the device loses network connection for 2 seconds
    When connection is restored
    Then the ride is still successfully assigned
    And the driver sees confirmation "Ride accepted and assigned"

  Scenario: Driver tries to accept after timeout has passed
    Given a ride request is displayed
    And 16 seconds have passed
    When the driver taps "Accept"
    Then the system shows "This request has expired"
    And the request is not assigned to the driver
    And a new available ride request is offered

  Scenario Outline: Acceptance rate tracking across multiple declines
    Given the driver has completed multiple rides
    When the driver declines <declines> consecutive requests
    Then the acceptance rate is calculated as <acceptance_rate>
    And the system may show a warning when <warning_threshold> is breached

    Examples:
      | declines | acceptance_rate | warning_threshold |
      | 1        | 95%             | no                |
      | 2        | 90%             | no                |
      | 3        | 85%             | yes               |
      | 5        | 75%             | yes               |


Feature: Ride Execution
  As a driver, I want to progress through each stage of a ride with clear actions,
  so that I can complete rides efficiently and the customer is kept informed.

  Background:
    Given driver "Ahmed" has accepted a ride for customer "Jane"
    And the ride is in "En route to pickup" status
    And the driver is authenticated and the ride is active
    And the driver's location is being tracked

  # --- Happy Path ---
  Scenario: Driver navigates to pickup location
    When the driver views the ride screen
    Then turn-by-turn navigation to "123 Main Street" is displayed
    And the estimated time to pickup (ETA) is shown
    And the customer can see the driver's live location on their map
    And the current distance to pickup is displayed

  Scenario: Driver arrives at pickup and notifies the customer
    Given the driver has arrived at the pickup location (within 50 meters)
    When the driver taps "I've Arrived"
    Then the ride status changes to "Waiting for rider"
    And the customer receives a notification "Your driver has arrived at the pickup location"
    And a wait timer starts counting up
    And the driver sees "Waiting for rider — 0 minutes"

  Scenario: Driver starts the ride when the customer boards
    Given the ride status is "Waiting for rider"
    And the customer has boarded the vehicle
    When the driver taps "Start Ride"
    Then the ride status changes to "In progress"
    And navigation to the destination begins
    And the fare meter starts running
    And the customer sees real-time navigation on their end

  Scenario: Driver completes the ride at the destination
    Given the driver has arrived at the destination (within 50 meters)
    And the ride status is "In progress"
    When the driver taps "Complete Ride"
    Then the final fare is calculated (base + distance + time - promotions)
    And the ride status changes to "Completed"
    And the payment is processed based on the customer's selected method
    And the driver sees the fare earned for this ride
    And the driver is asked to rate the customer

  Scenario: Driver confirms ride completion and receives earnings
    Given the ride is completed
    When the driver reviews the completion summary (fare, distance, time, tip)
    Then the earnings are deposited to the driver's wallet
    And the ride appears in the earnings history
    And the driver can proceed to the next ride request

  # --- Alternative Paths ---
  Scenario: Driver recalculates route due to traffic
    Given the driver is en route to pickup
    And a traffic incident has increased ETA by 10 minutes
    When the driver views the navigation
    Then the navigation automatically recalculates the best route
    And the updated ETA is displayed
    And the customer is notified of the new ETA

  Scenario: Driver requests to add a stop during an active ride
    Given the driver is on an active ride
    When the driver or customer adds a stop en route
    Then the system adds the stop to the route
    And navigation is updated to include the stop
    And the fare is recalculated based on the additional distance/time

  # --- Error/Edge Cases ---
  # Business rationale: Prevents false ride completions and earnings disputes
  Scenario: Customer does not appear at pickup within wait time
    Given the driver has been waiting at pickup for more than 5 minutes (configured wait time)
    And the ride status is "Waiting for rider"
    When the wait timer expires
    Then the driver is given the option to "Cancel — rider no-show"
    And a warning appears "Canceling will charge a no-show fee of $5.00 to the customer"
    And if the driver confirms cancellation, the ride status changes to "No-show cancelled"
    And the no-show fee is charged to the customer's payment method
    And the driver receives a portion of the no-show fee

  Scenario: Driver completes ride but payment processing fails
    Given the driver has tapped "Complete Ride"
    And the fare calculation is $28.50
    When the payment processor returns a failure
    Then the ride status temporarily shows "Payment processing"
    And the system retries the payment up to 3 times over 5 minutes
    And if all retries fail, the driver is notified "Payment processing failed. Please contact support."
    And the ride status shows "Completed (payment pending)"

  Scenario: Driver navigation loses signal en route to destination
    Given the driver is navigating to the destination
    And the GPS signal is lost for 30 seconds
    When the signal is restored
    Then navigation resumes with the current location
    And the app shows "Location restored"

  Scenario: Customer cancels ride while driver is en route
    Given the driver is en route to pickup
    And the customer initiates a cancellation
    When the cancellation is processed
    Then the driver receives a notification "Ride has been cancelled by customer"
    And the ride status changes to "Cancelled"
    And the driver is offered a cancellation fee (if within policy)
    And the driver returns to available status


Feature: Driver-Customer In-App Communication
  As a driver, I want to contact the customer via the app,
  so that I can coordinate pickup without exposing personal phone numbers.

  Background:
    Given driver "Ahmed" has an active ride with customer "Jane"
    And the ride is in "En route to pickup" or "Waiting for rider" status
    And both driver and customer are logged in

  # --- Happy Path ---
  Scenario: Driver calls the customer via masked number
    When the driver taps the "Call" button
    Then a phone call is initiated through a masked/proxy number
    And neither the driver's nor the customer's real phone number is revealed
    And the call duration is tracked for the ride record
    And the customer can answer or decline the call

  Scenario: Driver sends an in-app message to customer
    When the driver types "I'm at the main entrance" and taps send
    Then the message appears in the customer's ride chat
    And the message timestamp is recorded
    And the customer receives a push notification with the message content
    And the message is stored in the ride chat history

  Scenario: Driver receives a message from customer
    When the customer sends an in-app message "Please ring the doorbell"
    Then the driver receives a notification
    And the message appears in the driver's ride chat
    And the driver can read and respond to the message

  # --- Alternative Paths ---
  Scenario: Driver uses a quick message template
    When the driver taps the quick-message menu
    And selects a pre-written template "I've arrived, where are you?"
    Then the pre-written message is sent to the customer immediately
    And the message appears with a "Quick message" indicator
    And the customer receives a push notification

  Scenario: Driver customizes and sends a quick message template
    When the driver views a template message "I'll be there in 5 minutes"
    And edits it to "I'll be there in 3 minutes"
    And taps send
    Then the customized message is sent to the customer
    And the original template is unchanged for future use

  # --- Error/Edge Cases ---
  Scenario: Driver attempts to call but customer has blocked calls
    Given the customer has disabled incoming calls for this ride
    When the driver taps "Call"
    Then the system shows "Customer has not enabled calls for this ride"
    And the driver is offered "Send a message instead"

  Scenario: In-app message fails to send due to network issue
    Given the driver types a message "Running 5 minutes late"
    When the driver taps send and network connection is lost
    Then the message shows "Failed to send"
    And the driver is given an option to "Retry" or "Discard"
    And if "Retry" is selected, the message is resent when connection is restored

  Scenario: Driver sends message while temporarily offline
    Given the driver loses network connectivity
    When the driver attempts to send a message
    Then the message is queued locally
    And shows "Sending..."
    And when connection is restored, the message is delivered automatically

  Scenario Outline: Quick message template delivery
    Given the driver uses a quick message template
    When the driver sends the message "<template_text>"
    Then the customer receives the message within <delivery_time> seconds
    And the driver sees a delivery confirmation

    Examples:
      | template_text                         | delivery_time |
      | I've arrived, where are you?          | 3             |
      | Running 5 minutes late                | 3             |
      | I'll call you when I arrive           | 3             |
      | Please come downstairs                | 3             |


Feature: Driver Earnings Dashboard
  As a driver, I want to see a clear breakdown of my earnings,
  so that I can track my income and plan my finances.

  Background:
    Given driver "Ahmed" is logged in
    And the driver has completed at least one ride

  # --- Happy Path ---
  Scenario: Driver views daily earnings summary
    When the driver navigates to the "Earnings" tab
    Then the system shows today's total earnings in a card at the top
    And a detailed breakdown displays each ride with: date, pickup location, destination, fare, distance, time, tip, and commission
    And the total number of rides completed today is shown
    And total online hours for the day is displayed
    And the driver can see if tips were received

  Scenario: Driver views weekly earnings summary
    When the driver navigates to "Earnings"
    And selects "This Week" in the earnings filter
    Then the system shows total earnings for the week
    And number of completed rides this week
    And total online hours this week
    And a comparison to the previous week (e.g., "15% higher than last week")
    And a daily breakdown showing earnings for each day of the week

  Scenario: Driver views per-ride breakdown
    Given the driver completed a ride
    When the driver taps on a specific ride in the earnings list
    Then the driver sees a detailed breakdown: base fare, distance charge, time charge, surge multiplier (if applicable), promotions applied, tips, final fare after commission

  Scenario: Driver views tip details
    Given the driver completed a ride with a $3.50 tip
    When the driver views that ride's earnings detail
    Then the tip is shown separately with a "Tip" indicator
    And no commission is deducted from the tip amount
    And the base fare shows commission deduction separately

  # Business rationale: Transparency builds trust; drivers need to see exactly how commissions affect their earnings
  Scenario: Driver sees commission breakdown per ride
    Given the driver views a completed ride
    When the earnings detail is displayed
    Then the commission deduction is shown as a percentage (e.g., "20% commission: -$4.00")
    And the final earnings after commission are clearly highlighted
    And the driver can understand how the final amount was calculated

  Scenario: Driver compares earnings to previous period
    When the driver views the weekly earnings summary
    Then the system displays a comparison card showing "This week vs. Last week"
    And includes metrics: total earnings, average per ride, total rides, online hours
    And a visual indicator (arrow up/down) shows the trend

  # --- Alternative Paths ---
  Scenario: Driver filters earnings by date range
    Given the driver is on the "Earnings" screen
    When the driver selects a custom date range (e.g., March 1-15)
    Then the system displays earnings only for that period
    And the summary recalculates for the selected range
    And previous week comparison updates accordingly

  Scenario: Driver exports earnings summary
    When the driver taps "Export" on the earnings dashboard
    Then the system generates a PDF or CSV file with earnings details
    And the file includes: rides list, daily summary, weekly summary, commission breakdown
    And the file is prepared for download or email

  # --- Error/Edge Cases ---
  Scenario: Driver views earnings from a day with no completed rides
    Given the driver was online but completed zero rides on a specific day
    When the driver views that day's earnings
    Then the system shows "0 rides completed"
    And displays "No earnings today"
    And shows online hours for reference

  Scenario: Earnings calculation pending due to delayed payment confirmation
    Given a ride was completed but payment is still processing
    When the driver views the earnings dashboard
    Then the pending ride shows as "Payment processing"
    And the total earnings display excludes this pending ride
    And once payment confirms, the ride earnings are added to the total

  Scenario Outline: Earnings summary with various tip scenarios
    Given the driver completed a ride
    When the tip amount is "<tip_amount>"
    Then the earnings breakdown shows the tip "<tip_display>"
    And no commission is charged on the tip
    And the total earnings include the full tip amount

    Examples:
      | tip_amount | tip_display        |
      | $0         | No tip             |
      | $2.50      | $2.50 tip          |
      | $5.00      | $5.00 tip          |
      | $0.99      | $0.99 tip          |


Feature: Driver Payout Management
  As a driver, I want to manage when and how I receive my earnings,
  so that I can access my money conveniently and plan my finances.

  Background:
    Given driver "Ahmed" is logged in
    And the driver has a verified bank account on file
    And the driver has accumulated unpaid earnings

  # --- Happy Path ---
  Scenario: Driver views scheduled weekly payout
    When the driver navigates to "Payouts" section
    Then the system displays the next scheduled payout date (e.g., "Friday, 5:00 PM")
    And shows the amount that will be paid out
    And displays the account that will receive the funds
    And shows a countdown timer to the payout

  Scenario: Driver initiates a scheduled weekly payout
    Given the driver has accumulated $150.00 in unpaid earnings
    And the next scheduled payout is due on Friday
    When the driver navigates to "Payouts"
    Then the system shows "Scheduled payout of $150.00 on Friday at 5:00 PM"
    And the driver can confirm or cancel the payout
    And when confirmed, the payout is scheduled

  Scenario: Driver requests an instant payout
    Given the driver has $85.00 in accumulated unpaid earnings
    When the driver taps "Instant Payout"
    Then the system shows "Instant payout of $85.00 with a $1.50 processing fee"
    And displays final amount to be received: $83.50
    And when the driver confirms
    Then the transaction is initiated
    And the driver sees "Payout in progress"
    And $83.50 is transferred to the driver's bank account within 30 minutes

  Scenario: Driver views successful payout history
    When the driver navigates to "Payouts"
    And selects "History"
    Then the system displays a list of past payouts with: date, amount, payout method, status
    And the driver can see which payouts were standard vs. instant
    And each payout shows the fee (if applicable)

  Scenario: Driver verifies payout receipt
    Given a payout was successfully transferred
    When the driver reviews the payout history
    Then the payout shows status "Completed"
    And displays the date received
    And the driver can view a transaction receipt

  # --- Alternative Paths ---
  Scenario: Driver cancels a scheduled payout before processing
    Given a payout is scheduled for tomorrow at 5:00 PM
    And the processing has not yet begun
    When the driver navigates to "Payouts"
    And taps "Cancel" on the scheduled payout
    Then the system shows "Are you sure? This action cannot be undone."
    And when confirmed, the payout is cancelled
    And the earnings remain in the driver's wallet
    And the driver can reschedule or request an instant payout

  Scenario: Driver changes payout bank account
    Given the driver has a scheduled payout pending
    When the driver navigates to "Settings" > "Bank Account"
    And selects "Update Bank Account"
    And enters new account details
    Then the system updates the payout account
    And the next scheduled payout uses the new account
    And the driver receives a confirmation notification

  # Business rationale: Failed payouts create friction and distrust; drivers need clear visibility and support options
  # --- Error/Edge Cases ---
  Scenario: Scheduled payout fails due to invalid bank account
    Given the driver's bank account details are no longer valid
    When the scheduled payout time arrives
    Then the system attempts the transfer
    And when it fails, the driver receives a notification "Payout failed: Invalid account details"
    And the earnings remain in the driver's wallet
    And the driver is prompted to "Update Bank Account"
    And the driver can retry the payout once the account is corrected

  Scenario: Instant payout request fails due to network error
    Given the driver initiates an instant payout
    When the payment processor temporarily goes offline
    Then the system shows "Payout processing failed"
    And the driver is given the option to "Retry"
    And the earnings remain in the wallet
    And once the processor is back online, the driver can retry

  Scenario: Driver has insufficient balance for instant payout fee
    Given the driver has $1.20 in accumulated earnings
    When the driver taps "Instant Payout"
    Then the system shows "$1.20 balance, but minimum for instant payout is $2.00"
    And the driver is offered to wait for the next scheduled payout
    And or can complete a standard payout with lower fees

  Scenario: Payout takes longer than expected
    Given the driver initiated an instant payout
    And 45 minutes have passed
    When the driver checks the payout status
    Then the system shows "Payout in progress — may take up to 2 hours"
    And the driver can contact support for assistance
    And the driver receives an estimated completion time

  Scenario Outline: Payout scenarios with various balance and fee combinations
    Given the driver has "<balance>" in accumulated earnings
    When the driver requests a "<payout_type>" payout
    Then the system shows a fee of "<fee>"
    And the net amount to be received is "<net_amount>"

    Examples:
      | balance | payout_type | fee    | net_amount |
      | $50.00  | scheduled   | $0.00  | $50.00     |
      | $50.00  | instant     | $1.50  | $48.50     |
      | $100.00 | instant     | $1.50  | $98.50     |
      | $10.00  | instant     | $0.75  | $9.25      |


Feature: Driver Onboarding and Document Verification
  As a new driver, I want to submit my documents through the app,
  so that I can get approved and start accepting rides quickly.

  Background:
    Given a new driver "Ahmed" has registered an account
    And the driver is in "Pending Approval" status
    And the driver has not yet verified any documents

  # --- Happy Path ---
  Scenario: Driver uploads required documents
    Given the driver sees a checklist: "Driver's License", "Vehicle Insurance", "Vehicle Registration"
    When the driver taps "Upload" for "Driver's License"
    And captures a photo of the front and back
    And repeats for "Vehicle Insurance" and "Vehicle Registration"
    Then each document status changes to "Under Review"
    And the driver sees an estimated review time "Typically reviewed within 24 hours"
    And a progress bar shows 3/3 documents uploaded

  Scenario: Driver receives approval notification
    Given all of the driver's documents have been submitted
    And the admin has reviewed and approved all documents
    When the admin completes the approval process
    Then the driver receives a push notification "Your documents have been approved!"
    And when the driver opens the app
    Then the driver's account status changes to "Approved"
    And a green checkmark appears next to each document
    And the driver is prompted "You can now go online!"

  Scenario: Driver can now go online after approval
    Given all documents are approved
    When the driver navigates to the availability toggle
    Then the toggle is enabled (no longer greyed out)
    And the driver can tap to go "Online"
    And the driver can receive ride requests

  # --- Alternative Paths ---
  Scenario: A document is rejected with a reason
    Given the admin reviews the "Vehicle Insurance" document
    And determines it is expired
    When the admin selects "Reject" and enters reason "Document is expired"
    Then the document status changes to "Rejected"
    And the driver receives a notification with the rejection reason
    And when the driver opens the app
    Then the driver sees "Vehicle Insurance: Rejected — Document is expired"
    And the driver can tap "Re-upload" to submit a new document
    And the overall account status remains "Pending Approval"

  Scenario: Driver re-uploads a rejected document
    Given a document has been rejected with reason "Quality too low"
    When the driver taps "Re-upload"
    And provides a higher quality photo
    And taps "Submit"
    Then the new document is submitted for review
    And the status changes to "Under Review"
    And the driver sees "Re-upload submitted — review in progress"

  Scenario: Driver uploads documents incrementally
    Given the driver is on the onboarding checklist
    When the driver uploads "Driver's License"
    Then the status shows "1/3 uploaded"
    And the driver can close the app
    And when the driver returns
    Then the incomplete documents remain in "Not uploaded" state
    And the driver can continue uploading remaining documents

  # --- Error/Edge Cases ---
  Scenario: Document nearing expiry triggers a reminder
    Given the driver's "Vehicle Insurance" expires in 30 days
    When the system runs the daily expiry check
    Then the driver receives a notification "Your Vehicle Insurance expires in 30 days. Please upload a renewed document."
    And the document status shows "Expiring soon" with a yellow warning icon
    And the driver can tap to re-upload immediately

  Scenario: Expired document restricts driver from going online
    Given the driver's "Driver's License" has expired (past expiry date)
    When the driver tries to toggle online
    Then the system blocks the action
    And displays message "Your Driver's License has expired. Please upload a renewed document to continue."
    And the toggle remains in "Offline" state
    And the driver sees a "Re-upload" button to proceed

  Scenario: Driver uploads document with wrong type
    Given the driver is uploading "Vehicle Insurance"
    When the driver accidentally uploads a "Driver's License" photo
    Then the system detects the mismatch (via document type validation or admin review)
    And the document is flagged for rejection
    When the driver is notified
    Then the driver sees "Document does not match requested type: Vehicle Insurance"
    And can immediately re-upload the correct document

  Scenario: Document upload fails due to poor image quality
    Given the driver uploads a blurry photo of their "Vehicle Insurance"
    When the admin reviews it
    Then the admin rejects it with reason "Image quality too low — please upload a clear photo"
    And the driver is notified
    And the driver can re-upload with a clearer image

  Scenario: Driver receives approval but one document is expiring soon
    Given all documents are approved
    And one document will expire in 15 days
    When the driver views their profile
    Then the driver sees a notification "Vehicle Registration expires in 15 days"
    And the document shows "Expiring soon"
    And the driver can proactively re-upload before it expires

  Scenario Outline: Document review timeline and status progression
    Given the driver has uploaded "<document_type>"
    When the admin completes the review
    And the outcome is "<admin_decision>"
    Then the driver sees status "<driver_status>"
    And the driver is notified "<notification_text>"

    Examples:
      | document_type       | admin_decision | driver_status     | notification_text                       |
      | Driver's License    | Approved       | Approved          | Your Driver's License has been approved |
      | Vehicle Insurance   | Approved       | Approved          | Your Vehicle Insurance has been approved |
      | Vehicle Registration| Rejected       | Rejected          | Vehicle Registration has been rejected  |


Feature: Driver Performance and Rating Visibility
  As a driver, I want to see my ratings and performance metrics,
  so that I can understand how I'm performing and improve where needed.

  Background:
    Given driver "Ahmed" is logged in
    And the driver has completed at least 5 rides

  # --- Happy Path ---
  Scenario: Driver views their overall rating
    When the driver navigates to their profile
    Then the system displays the overall average rating (e.g., 4.7 out of 5)
    And shows the number of ratings received (e.g., "Based on 47 ratings")
    And a rating trend graph displays average rating over the past 30 days
    And the distribution of star ratings is shown (e.g., "47 5-stars, 3 4-stars, 2 3-stars")

  Scenario: Driver views acceptance and cancellation rates
    When the driver navigates to "Performance" section
    Then the system shows the acceptance rate (e.g., 92%)
    And the cancellation rate (e.g., 1%)
    And total completed rides this month (e.g., 87 rides)
    And a note explaining what impacts these metrics

  Scenario: Driver views performance-based incentives
    Given the driver's metrics meet certain thresholds (e.g., >90% acceptance, >4.5 rating)
    When the driver navigates to "Performance"
    Then the system displays available incentives (e.g., "Weekly bonus $50 for 90%+ acceptance")
    And progress towards earning each incentive
    And the driver sees "You're 3 rides away from this week's bonus"

  Scenario: Driver tracks rating trend over time
    When the driver views the rating section
    Then a chart shows average rating for the past 7, 14, and 30 days
    And the driver can see if rating is trending up or down
    And the driver can identify which period had the best performance

  # --- Alternative Paths ---
  Scenario: Driver reviews negative feedback
    Given the driver has received low ratings
    When the driver taps "View Feedback"
    Then the driver can read customer comments (if provided)
    And the feedback is linked to specific ratings
    And the driver can use this to improve service

  Scenario: Driver disputes a low rating
    Given the driver believes a low rating is unfair
    When the driver taps "Report Issue" on that rating
    Then a form appears for the driver to explain their side
    And the driver can provide additional context
    And the report is sent to support for review

  # --- Error/Edge Cases ---
  # Business rationale: Rating drops indicate service quality issues that need immediate attention
  Scenario: Driver's rating drops below threshold (4.0)
    Given the driver's average rating falls below 4.0
    When the system detects the drop
    Then the driver receives a notification "Your rating has dropped below 4.0"
    And the driver navigates to their profile
    Then they see a red warning badge "Rating Alert"
    And a message "Your rating is 3.8/5. Please review feedback and consider improving service quality."
    And the driver's account is flagged for admin review
    And the admin may reach out with guidance or warnings

  Scenario: New driver with few ratings
    Given the driver has completed only 3 rides and has 2 ratings
    When the driver views their rating
    Then the system shows "2 ratings (4.5 average)" with a note "Minimum 5 ratings for meaningful metric"
    And the driver is encouraged to complete more rides
    And the rating is marked as "Provisional"

  Scenario: Rating improves after intervention
    Given the driver's rating was 3.7 and has now improved to 4.2
    When the driver views their performance
    Then the system shows "Great improvement! Your rating is now 4.2/5"
    And the trend chart shows the upward trajectory
    And any previous warning badge is removed

  Scenario Outline: Performance metrics with various completion counts
    Given the driver has completed "<ride_count>" rides
    When the driver views performance metrics
    Then the acceptance rate shows "<acceptance_rate>"
    And the cancellation rate shows "<cancellation_rate>"
    And the overall rating is "<rating>"

    Examples:
      | ride_count | acceptance_rate | cancellation_rate | rating |
      | 5          | 85%             | 2%                | 4.6    |
      | 50         | 90%             | 1%                | 4.5    |
      | 100        | 92%             | 0.5%              | 4.7    |
      | 250        | 95%             | 0.3%              | 4.8    |


Feature: Driver Navigation and Route Management
  As a driver, I want reliable turn-by-turn navigation,
  so that I can reach pickups and destinations efficiently, especially in unfamiliar areas.

  Background:
    Given driver "Ahmed" has accepted a ride
    And the ride details include pickup and destination addresses
    And the driver's device has GPS enabled
    And the device has a working internet connection

  # --- Happy Path ---
  Scenario: Driver receives turn-by-turn navigation to pickup
    Given the ride status is "En route to pickup"
    When the driver views the ride screen
    Then turn-by-turn navigation is automatically launched
    And the map displays the pickup location with a marker
    And voice guidance begins (if enabled)
    And the current ETA to pickup is displayed (e.g., "8 minutes")
    And the distance remaining is shown (e.g., "2.3 km")
    And the driver can see the route highlighted on the map

  Scenario: Driver arrives at pickup location
    Given the driver is navigating to pickup
    When the driver reaches within 50 meters of the pickup address
    Then the navigation alerts "Arriving at destination"
    And the system prompts the driver to tap "I've Arrived"
    And the ride status on the navigation screen updates to show "At pickup location"

  Scenario: Driver receives turn-by-turn navigation to destination
    Given the ride status is "In progress" (customer has boarded)
    When the driver views the navigation screen
    Then turn-by-turn navigation to the destination is displayed
    And the destination address is clearly shown at the top
    And the ETA to destination is displayed
    And distance remaining is shown
    And voice guidance resumes (if enabled)

  Scenario: Driver completes navigation to destination
    Given the driver is navigating to the destination
    When the driver arrives within 50 meters of the destination address
    Then the navigation alerts "Arriving at destination"
    And the driver is prompted to tap "Complete Ride"
    And the navigation screen displays "At destination"

  # --- Alternative Paths ---
  Scenario: Driver recalculates route due to traffic
    Given the driver is en route to pickup
    And a traffic incident has increased ETA by 10 minutes
    When the navigation engine recalculates
    Then the system automatically finds the fastest alternative route
    And the updated ETA is displayed (e.g., "18 minutes" instead of "8 minutes")
    And the customer is notified of the new ETA
    And the driver can choose to accept the new route or manually select alternative

  Scenario: Driver manually selects an alternative route
    Given the driver is navigating
    When the driver taps "Alternative routes"
    Then the system displays 2-3 alternative routes ranked by time
    And the driver can see the time savings/losses for each option
    And when the driver selects an alternative
    Then navigation updates to the new route

  Scenario: Driver navigates to multiple stops
    Given the customer has added multiple stops to the ride
    When the driver views the ride details
    Then the navigation displays all stops in sequence (Stop 1, Stop 2, Destination)
    And the driver navigates to Stop 1 first
    And upon arrival at Stop 1, the navigation guides to Stop 2
    And this continues until all stops are visited

  Scenario: Driver adds a stop at customer request
    Given the ride is in progress
    When the customer requests to add a stop
    Then the driver receives a notification "Customer requests to add a stop"
    And the driver can accept or decline the stop
    And if accepted, navigation updates to include the new stop
    And the route is recalculated with the new stop

  # --- Error/Edge Cases ---
  Scenario: Navigation loses GPS signal temporarily
    Given the driver is navigating
    When the GPS signal is lost for 15 seconds
    Then the map shows "Location unavailable"
    And navigation pauses
    And when the signal is restored
    Then the driver's current location is updated
    And navigation resumes with recalculated route from current location
    And the system shows "Location restored"

  Scenario: Navigation cannot find a matching address
    Given the driver is en route to a pickup
    And the pickup address is vague or incomplete (e.g., "123 Main St" with no city)
    When the driver views the navigation
    Then the system shows a list of possible matching addresses
    And the driver can select the correct one
    And navigation updates to the selected address
    And the customer is notified of the corrected address

  Scenario: Driver manually enters a waypoint
    Given the driver is navigating
    When the driver taps "Add waypoint"
    And enters a location (e.g., "gas station")
    Then navigation adds the waypoint to the route
    And updates the overall ETA
    And the driver can proceed to the waypoint first before continuing

  Scenario: Route navigation fails due to no internet connection
    Given the driver is navigating
    When the internet connection is lost
    Then the navigation switches to offline map mode (if available)
    And the driver can see the map and destination but without real-time traffic
    And voice guidance continues (if data was previously cached)
    And once connection is restored, real-time features resume

  Scenario: Driver requests offline maps before a ride
    Given the driver is online but in an area with poor connectivity
    When the driver taps "Download offline maps"
    And selects a region (e.g., "Downtown District")
    Then the system downloads maps for that region
    And stores them locally on the device
    And when the driver accepts a ride in that region, navigation works without internet

  Scenario Outline: Navigation arrival scenarios with various distances
    Given the driver is navigating to "<destination_type>"
    When the driver is "<distance_away>" from the destination
    Then the navigation shows "<notification_text>"
    And the driver sees "<action_prompt>"

    Examples:
      | destination_type | distance_away | notification_text        | action_prompt           |
      | pickup           | 500m          | Soon arriving at pickup  | Coming up on the left   |
      | pickup           | 100m          | Arriving at pickup       | I've Arrived button     |
      | destination      | 500m          | Soon arriving at destination | Turn right ahead     |
      | destination      | 100m          | Arriving at destination  | Complete Ride button    |


Feature: Driver Profile and Vehicle Management
  As a driver, I want to manage my personal information and vehicle details,
  so that my profile is accurate and my vehicle information is kept up to date.

  Background:
    Given driver "Ahmed" is logged in
    And the driver's profile exists with basic information
    And the driver can access Settings/Profile section

  # --- Happy Path ---
  Scenario: Driver updates personal information
    When the driver navigates to "Profile" > "Personal Information"
    Then the driver sees fields for: First Name, Last Name, Email, Phone Number, Date of Birth
    And the fields display the current information
    When the driver edits "Phone Number" from "555-1111" to "555-2222"
    And taps "Save"
    Then the system validates the new phone number
    And the update is confirmed "Phone number updated successfully"
    And the new information is used for future ride communications

  Scenario: Driver updates bank account details
    Given the driver navigates to "Settings" > "Bank Account"
    When the driver taps "Update Bank Account"
    Then the driver sees fields for: Account Holder Name, Bank Name, Account Number, Routing Number
    And current account information is displayed (partially masked: ****1234)
    When the driver enters new account details
    And taps "Save"
    Then the system validates the account (via bank validation service)
    And displays "Bank account updated"
    And the new account is used for next scheduled payout

  Scenario: Driver registers a new vehicle
    Given the driver has no registered vehicles (new driver)
    When the driver navigates to "Vehicle" > "Add Vehicle"
    Then the driver sees a form with fields: Vehicle Type (sedan/SUV/van), Make, Model, Year, License Plate, VIN
    And the driver enters the vehicle information
    And uploads a photo of the vehicle (front view)
    When the driver taps "Save"
    Then the system confirms "Vehicle registered successfully"
    And the vehicle is assigned to the driver's account
    And the vehicle is linked to all future rides

  Scenario: Driver updates vehicle information
    Given the driver has a registered vehicle
    When the driver navigates to "Vehicle"
    Then the current vehicle is displayed with: Make, Model, Year, License Plate, Vehicle Photo
    When the driver taps "Edit"
    And updates the vehicle information (e.g., new license plate)
    And taps "Save"
    Then the changes are confirmed
    And all future rides reflect the updated vehicle information

  Scenario: Driver uploads vehicle photo
    Given the driver is registering or updating a vehicle
    When the driver taps "Upload Photo"
    And takes a photo of the vehicle
    Then the photo is captured and displayed
    And the driver can retake or confirm
    And when confirmed, the photo is saved to the vehicle profile

  # --- Alternative Paths ---
  Scenario: Driver changes email address
    Given the driver is on the profile screen
    When the driver taps "Edit" next to the email
    And enters a new email "newemail@example.com"
    And taps "Save"
    Then the system sends a verification link to the new email
    And the driver must verify the email by clicking the link
    And once verified, the email is updated and used for future communications

  Scenario: Driver adds a second vehicle
    Given the driver already has one registered vehicle
    When the driver navigates to "Vehicle" > "Add Vehicle"
    And registers a second vehicle
    Then both vehicles are listed in the driver's profile
    And the driver can select which vehicle to use for upcoming rides
    And the vehicle photos and details are stored separately

  Scenario: Driver temporarily deactivates a vehicle
    Given the driver has multiple registered vehicles
    When the driver navigates to "Vehicle"
    And taps "Deactivate" on one vehicle
    Then the vehicle is marked as "Inactive"
    And the driver cannot select this vehicle for new rides
    And the vehicle can be reactivated later

  # --- Error/Edge Cases ---
  Scenario: Driver attempts to update email with duplicate email
    Given the driver tries to change their email to an email already in the system
    When the driver enters "existing@example.com" (already used by another driver)
    And taps "Save"
    Then the system displays "Email already in use"
    And the email is not updated
    And the driver is prompted to use a different email

  Scenario: Driver's bank account validation fails
    Given the driver enters new bank account details
    When the system validates the account with the bank
    And the bank returns an error (invalid account/routing number)
    Then the system displays "Bank account validation failed"
    And shows "Please verify the account number and routing number"
    And the account is not saved
    And the driver can retry with corrected details

  Scenario: Driver uploads invalid vehicle photo
    Given the driver is uploading a vehicle photo
    When the driver uploads a blurry or irrelevant photo
    Then the system detects the issue (via image validation)
    And displays "Please upload a clear photo of the vehicle"
    And the driver can retake or select a different photo

  Scenario: Driver deletes vehicle (with only one vehicle registered)
    Given the driver has only one vehicle registered
    When the driver taps "Delete Vehicle"
    Then the system displays "You must have at least one active vehicle. Consider deactivating instead."
    And the vehicle is not deleted
    And the driver can deactivate the vehicle instead

  Scenario: Driver's phone number update affects communications
    Given the driver updated their phone number
    When future ride notifications are sent
    Then calls and SMS messages are sent to the new phone number
    And the old phone number is no longer used
    And the driver can verify the change in Settings

  Scenario Outline: Profile field validation for various inputs
    Given the driver is updating "<field_name>"
    When the driver enters "<input_value>"
    Then the system shows validation "<validation_result>"
    And the field update "<update_status>"

    Examples:
      | field_name      | input_value           | validation_result          | update_status |
      | Email           | valid@example.com     | Valid email format         | Saved         |
      | Email           | invalidemail          | Invalid email format       | Not saved     |
      | Phone Number    | 555-1234              | Valid phone format         | Saved         |
      | Phone Number    | 123                   | Phone number too short     | Not saved     |
      | License Plate   | ABC1234               | Valid format               | Saved         |
      | License Plate   | (blank)               | Required field             | Not saved     |
```

---

I have written a comprehensive BDD requirements specification for EPIC 2: DRIVER APP with all 10 requested features. Each feature includes:

**Key characteristics:**

1. **Background blocks** — All explicitly reference foundational prerequisites (authentication, document verification status, bank account verification, etc.)

2. **Clear section organization:**
   - Happy Path scenarios (main success flows)
   - Alternative Paths scenarios (variations and options)
   - Error/Edge Cases scenarios (failure modes, validation, timeouts, network issues)

3. **Business rationale comments** — Added where "why" isn't immediately obvious (e.g., inactivity timeouts, low acceptance rates, payout failures, rating thresholds)

4. **Comprehensive Scenario Outlines** — Used Examples tables for multi-variant scenarios:
   - Acceptance rate tracking with different decline counts
   - Quick message delivery with various templates
   - Earnings calculations with different tip amounts and fee structures
   - Payout scenarios with balance/fee combinations
   - Document review outcomes and status progressions
   - Performance metrics across various ride counts
   - Navigation arrival scenarios at different distances
   - Profile field validation with various inputs

5. **10 complete features:**
   - Driver Online/Offline Toggle
   - Ride Request Handling
   - Ride Execution Flow
   - Driver-Customer Communication
   - Driver Earnings Dashboard
   - Payout Management (added)
   - Driver Onboarding and Document Verification
   - Driver Performance Metrics
   - Driver Navigation and Route Management (added)
   - Driver Profile and Vehicle Management (added)

All scenarios follow Gherkin syntax conventions with Given/When/Then structure and are ready for BDD test automation and team review.


---

### EPIC 3: ADMIN BACK OFFICE PORTAL

```gherkin
# ============================================================================
# EPIC 3: ADMIN BACK OFFICE PORTAL
# ============================================================================

# Feature 1: Driver Management
# ============================================================================
Feature: Driver Management
  As an Admin
  I want to manage driver applications, onboarding, and account lifecycle
  So that I can ensure only qualified drivers operate in the system

  Background:
    # Foundational prerequisites for driver management
    Given the admin user is authenticated and authorized with "DRIVER_MANAGEMENT" permission
    And the admin user has "ADMIN" or "OPERATIONS" role
    And the system has driver application records in various states (pending, approved, rejected)
    And the system has active drivers with various account statuses (active, suspended, deactivated)

  # Happy Path: Approve Driver Application
  Scenario: Approve a pending driver application
    Given a driver application is in "PENDING" review status
    And the application includes all required documents (license, insurance, background check)
    And the background check result is "CLEAR"
    When the admin reviews the driver application details
    And the admin clicks "Approve Application"
    And the admin provides approval notes "License verified, background clear"
    And the admin confirms the approval
    Then the driver application status changes to "APPROVED"
    And the driver account is automatically created with status "ACTIVE"
    And an approval notification is sent to the driver's email
    And the approval action is logged in the audit trail with admin name and timestamp

  # Happy Path: View Driver Details
  Scenario: View comprehensive driver profile and history
    Given an active driver exists in the system with ID "DRV-12345"
    When the admin searches for driver "DRV-12345"
    And the admin clicks on the driver record
    Then the admin sees the driver profile with sections:
      | Personal Information    | Name, phone, email, document numbers       |
      | Account Status          | Current status, activation date, suspension |
      | Vehicle Assignments     | Assigned vehicles with details              |
      | Ride History            | Last 20 rides, completion rate, ratings     |
      | Commission Details      | Earnings, payouts, commission rate          |
      | Documents               | Verification documents with expiry dates    |
      | Violations & Reports    | Safety complaints, cancellation history     |
    And the admin can view the driver's timeline of actions (approvals, suspensions)

  # Happy Path: Suspend Driver Account
  Scenario: Suspend an active driver account
    Given an active driver exists with ID "DRV-12345"
    When the admin navigates to the driver's profile
    And the admin clicks "Suspend Driver"
    And the admin selects suspension reason "Payment fraud suspected"
    And the admin enters suspension duration "7 days"
    And the admin provides internal notes "Investigating suspicious payout pattern"
    And the admin confirms the suspension
    Then the driver account status changes to "SUSPENDED"
    And the driver is immediately removed from the active driver pool
    And pending rides assigned to this driver are reassigned to other drivers
    And a suspension notification is sent to the driver with reason and duration
    And the suspension is recorded in the audit trail

  # Happy Path: Reactivate Suspended Driver
  Scenario: Reactivate a suspended driver account
    Given a driver exists with status "SUSPENDED" due to expiry
    And the suspension period has elapsed
    When the admin views the driver profile
    And the admin clicks "Reactivate Driver"
    And the admin confirms the reactivation
    Then the driver status changes from "SUSPENDED" to "ACTIVE"
    And the driver becomes available for new ride assignments
    And a reactivation notification is sent to the driver
    And the reactivation is logged with admin name and timestamp

  # Happy Path: Deactivate Driver Account
  Scenario: Permanently deactivate a driver account
    Given an active driver exists with ID "DRV-12345"
    When the admin navigates to the driver's profile
    And the admin clicks "Deactivate Driver"
    And the admin selects reason "Driver requested deactivation"
    And the admin confirms the permanent deactivation
    Then the driver account status changes to "DEACTIVATED"
    And the driver is permanently removed from the driver pool
    And pending rides assigned to this driver are reassigned
    And a deactivation notification is sent to the driver
    And the account can only be reactivated by the driver through the app

  # Alternative Path: Reject Driver Application
  Scenario: Reject a pending driver application
    Given a driver application is in "PENDING" review status
    And the background check result is "FAILED"
    When the admin reviews the application
    And the admin clicks "Reject Application"
    And the admin selects rejection reason "Background check failed"
    And the admin provides feedback message "Unfortunately, we cannot proceed. Please contact support for details."
    And the admin confirms the rejection
    Then the driver application status changes to "REJECTED"
    And a rejection notification is sent to the driver with reason and feedback
    And no driver account is created
    And the driver can reapply after 30 days

  # Alternative Path: Request Additional Information
  Scenario: Request additional documents from pending driver
    Given a driver application is in "PENDING" review status
    And the insurance document is missing or expired
    When the admin reviews the application
    And the admin clicks "Request More Information"
    And the admin specifies required documents: "Updated insurance certificate"
    And the admin sets deadline "7 days"
    And the admin provides explanation message
    And the admin submits the request
    Then the application status changes to "AWAITING_DOCUMENTS"
    And the driver receives notification with list of required documents and deadline
    And the admin is reminded to follow up if documents aren't provided before deadline
    And the application can return to "PENDING" once documents are uploaded

  # Alternative Path: Suspend Driver with Immediate Effect
  Scenario: Suspend an active driver for safety violation
    Given an active driver exists with ID "DRV-12345"
    And a safety complaint has been filed against this driver
    When the admin reviews the complaint
    And the admin determines immediate action is necessary
    And the admin clicks "Suspend Immediately"
    And the admin selects severity "Safety violation - requires immediate removal"
    And the admin enters duration "30 days" with option for review
    And the admin provides compliance notes
    And the admin confirms immediate suspension
    Then the driver status changes to "SUSPENDED" immediately
    And the driver's active ride is reassigned to nearest available driver
    And driver's pending ride requests are cancelled
    And a suspension notification with reason is sent to driver
    And compliance team is notified of the action

  # Error Case: Cannot approve application with missing documents
  Scenario: Attempt to approve application missing required documentation
    Given a driver application is in "PENDING" review status
    And the background check document is missing
    When the admin clicks "Approve Application"
    Then the system displays error: "Cannot approve - background check document required"
    And the missing document is highlighted in the application
    And the approve button is disabled until all documents are present
    And the admin is prompted to request the missing document

  # Error Case: Cannot suspend already suspended driver
  Scenario: Attempt to suspend a driver already in suspended status
    Given a driver exists with status "SUSPENDED"
    When the admin navigates to the driver's profile
    And the admin clicks "Suspend Driver"
    Then the system displays error: "Driver is already suspended until [date]"
    And the current suspension details are displayed
    And the admin is offered option to "Extend Suspension" or "Cancel Suspension" instead

  # Error Case: Invalid suspension duration
  Scenario: Attempt to suspend driver with invalid duration
    Given an active driver exists with ID "DRV-12345"
    When the admin clicks "Suspend Driver"
    And the admin enters suspension duration "0 days"
    And the admin attempts to confirm
    Then the system displays error: "Suspension duration must be between 1 and 365 days"
    And the duration field is highlighted
    And the confirm button remains disabled

  # Edge Case: Reactivate driver during ongoing dispute
  Scenario: Reactivate suspended driver with open safety dispute
    Given a driver exists with status "SUSPENDED"
    And an open safety dispute is associated with this driver
    When the admin attempts to reactivate the driver
    Then the system displays warning: "This driver has an open safety dispute"
    And the admin sees dispute details
    And the admin can choose to "Reactivate Anyway" or "Resolve Dispute First"
    And if reactivated, the admin must acknowledge the risk in writing

  # Edge Case: Mass suspension of drivers for regulatory violation
  Scenario: Suspend multiple drivers due to system-wide regulatory issue
    Given the system has 50 active drivers
    And a regulatory violation has been identified affecting multiple drivers
    When the admin navigates to "Bulk Driver Actions"
    And the admin selects filter criteria: "Vehicles registered in affected region"
    And the system identifies 12 drivers matching criteria
    And the admin clicks "Suspend Selected" (12 drivers)
    And the admin provides reason "Regulatory violation - vehicle registration"
    And the admin confirms bulk suspension
    Then all 12 selected drivers are suspended simultaneously
    And pending rides for all suspended drivers are reassigned
    And bulk suspension notification is sent to all affected drivers
    And a compliance report is generated and sent to regulatory team

  # Business rationale: Bulk actions reduce admin workload for system-wide compliance issues


# Feature 2: Vehicle and Fare Management
# ============================================================================
Feature: Vehicle and Fare Management
  As an Admin
  I want to configure vehicle types and fare structures
  So that the pricing is competitive and vehicles are appropriate for service areas

  Background:
    # Foundational prerequisites for vehicle and fare management
    Given the admin user is authenticated and authorized with "VEHICLE_FARE_MANAGEMENT" permission
    And the admin user has "ADMIN" or "OPERATIONS" role
    And the system has existing vehicle types with current fare configurations
    And the system has multiple service zones with different fare rules

  # Happy Path: Create New Vehicle Type
  Scenario: Create a new vehicle type with base configuration
    Given the admin is on the "Vehicle Types" management page
    When the admin clicks "Add Vehicle Type"
    And the admin enters vehicle type details:
      | Field              | Value                |
      | Type Name          | Premium Sedan        |
      | Capacity           | 4 passengers         |
      | Description        | Luxury sedan service |
      | Color Tag          | Blue                 |
      | Icon/Image         | sedan.png            |
    And the admin clicks "Create Vehicle Type"
    Then the new vehicle type "Premium Sedan" is created with status "ACTIVE"
    And the vehicle type appears in the vehicle types list
    And the system assigns a unique vehicle type ID
    And a success notification is displayed: "Vehicle type created successfully"

  # Happy Path: Configure Fare Components for Vehicle Type
  Scenario: Set up comprehensive fare structure for vehicle type
    Given a vehicle type "Premium Sedan" exists
    And the admin is on the "Fare Configuration" page
    When the admin selects vehicle type "Premium Sedan"
    And the admin enters fare components:
      | Component        | Value    | Notes                    |
      | Base Fare        | $5.00    | Minimum fare per ride    |
      | Per Km Rate      | $1.50    | Distance-based charge    |
      | Per Minute Rate  | $0.30    | Wait time charge         |
      | Minimum Fare     | $8.00    | Floor for short rides     |
      | Booking Fee      | $0.50    | Platform charge          |
    And the admin applies these rates to service zone "Downtown"
    And the admin clicks "Save Fare Configuration"
    Then the fare configuration is saved for "Premium Sedan" in "Downtown"
    And a preview shows example trip cost: $5.00 (base) + $6.00 (5km) + $3.00 (10min) = $14.00
    And the configuration is effective immediately
    And a confirmation is logged in the audit trail

  # Happy Path: Update Vehicle Type Status
  Scenario: Disable a vehicle type
    Given a vehicle type "Standard Sedan" exists with status "ACTIVE"
    And 0 drivers currently have this vehicle type assigned
    When the admin selects vehicle type "Standard Sedan"
    And the admin clicks "Disable Vehicle Type"
    And the admin confirms the action
    Then the vehicle type status changes to "DISABLED"
    And new drivers cannot select this vehicle type during onboarding
    And existing drivers with this vehicle type can continue but cannot add more
    And rides requested for this vehicle type show "Currently unavailable"

  # Happy Path: Bulk Update Fares Across Vehicle Types
  Scenario: Apply percentage fare increase across multiple vehicle types
    Given multiple vehicle types exist with current fare configurations
    And the admin needs to increase fares due to fuel cost inflation
    When the admin navigates to "Bulk Fare Update"
    And the admin selects vehicle types: "Standard Sedan", "SUV", "XL Van"
    And the admin selects update method "Percentage Increase"
    And the admin enters percentage "8%"
    And the admin selects service zones: "Downtown", "Suburban", "Airport"
    And the admin reviews the preview showing new fares for each type/zone combination
    And the admin confirms the bulk update
    Then all selected fare configurations are updated with 8% increase
    And the new fares are effective from the next billing hour
    And an audit log entry shows which fares were updated, by whom, and when
    And notifications are sent to affected customers showing new pricing

  # Alternative Path: Update Fares with Zone-Specific Variations
  Scenario: Configure different fares for same vehicle type across zones
    Given vehicle type "Premium Sedan" exists
    And service zones "Downtown", "Airport", "Suburban" are defined
    When the admin selects "Premium Sedan"
    And the admin clicks "Configure Zone-Specific Fares"
    And the admin sets fares per zone:
      | Zone       | Base Fare | Per Km | Per Min | Minimum |
      | Downtown   | $5.00     | $1.50 | $0.30  | $8.00   |
      | Airport    | $8.00     | $2.00 | $0.40  | $12.00  |
      | Suburban   | $4.00     | $1.25 | $0.25  | $6.50   |
    And the admin saves zone-specific configuration
    Then each zone has its own fare table for this vehicle type
    And the system applies correct fares based on pickup zone
    And a matrix view shows fare comparison across zones

  # Alternative Path: Create Time-Based Fare Variations
  Scenario: Set up different fares for peak and off-peak hours
    Given vehicle type "Standard Sedan" exists
    When the admin navigates to "Time-Based Fare Configuration"
    And the admin selects vehicle type "Standard Sedan"
    And the admin creates time periods:
      | Period      | Days            | Time      | Multiplier |
      | Peak Hours  | Mon-Fri         | 8-10am    | 1.25x      |
      | Peak Hours  | Mon-Fri         | 5-7pm     | 1.25x      |
      | Night Hours | Daily           | 10pm-6am  | 1.50x      |
      | Off-Peak    | All other times | -         | 1.0x       |
    And the admin applies these to service zone "Downtown"
    And the admin saves time-based configuration
    Then fares are automatically adjusted based on current time and day
    And customers see surge multiplier in fare estimate before booking
    And historical data shows peak/off-peak comparison

  # Alternative Path: Temporarily Reduce Fares for New Vehicle Type Launch
  Scenario: Create promotional fares for new vehicle type launch
    Given a new vehicle type "Economy Plus" is being launched
    When the admin creates "Promotional Fare Configuration"
    And the admin sets temporary reduced rates:
      | Field           | Value  |
      | Base Fare       | $3.50  |
      | Per Km Rate     | $1.00  |
      | Campaign Period | 30 days |
    And the admin specifies zones: "Downtown", "Suburban"
    And the admin saves promotional configuration with start date
    Then promotional fares are applied for 30 days
    And a countdown timer shows days remaining on promotion
    And after 30 days, fares automatically revert to standard rates
    And a report shows booking volume increase during promotion

  # Error Case: Cannot disable vehicle type with active drivers
  Scenario: Attempt to disable vehicle type with assigned drivers
    Given vehicle type "Standard Sedan" exists with 15 active drivers assigned
    When the admin selects vehicle type "Standard Sedan"
    And the admin clicks "Disable Vehicle Type"
    Then the system displays error: "Cannot disable - 15 active drivers assigned"
    And the system suggests options:
      | Option                          |
      | Reassign drivers to other types |
      | Set to inactive (drivers keep type) |
    And the disable button is disabled

  # Error Case: Invalid fare component value
  Scenario: Attempt to save fare configuration with negative per-km rate
    Given vehicle type "Premium Sedan" is selected
    When the admin enters fare components with per-km rate: "-$1.50"
    And the admin clicks "Save Fare Configuration"
    Then the system displays error: "Per-km rate must be greater than 0"
    And the invalid field is highlighted in red
    And the save button remains disabled until valid value is entered

  # Error Case: Per-km rate exceeds per-minute rate disproportionately
  Scenario: Validate logical fare structure
    Given vehicle type "Standard Sedan" is selected
    When the admin enters fare components:
      | Component       | Value  |
      | Base Fare       | $0.50  |
      | Per Km Rate     | $100   |
      | Per Minute Rate | $0.05  |
      | Minimum Fare    | $0.25  |
    And the admin clicks "Save Fare Configuration"
    Then the system displays warning: "Per-km rate ($100) is unusually high compared to per-minute rate ($0.05)"
    And the admin is asked to confirm if this is intentional
    And if confirmed, the configuration is saved

  # Edge Case: Update fares during active surge pricing period
  Scenario: Apply manual fare update while surge pricing is active
    Given vehicle type "Standard Sedan" has active surge pricing (2.5x multiplier)
    And 200 active rides are using surge-adjusted fares
    When the admin navigates to "Fare Configuration"
    And the admin attempts to update base fare for "Standard Sedan"
    Then the system displays warning: "Surge pricing is currently active (2.5x)"
    And the admin sees current effective fares (base * surge multiplier)
    And the admin can choose to:
      | Option                                  |
      | Update base fare (surge continues to apply) |
      | Wait for surge to end before updating      |
    And if updated, new rides use updated base with surge multiplier applied

  # Business rationale: Allows dynamic pricing adjustments without disrupting active surge periods

  # Edge Case: Bulk fare update scheduled for off-peak time
  Scenario: Schedule bulk fare update for low-traffic period
    Given the admin needs to update fares for 12 vehicle types
    When the admin navigates to "Bulk Fare Update"
    And the admin enters new fare configuration
    And the admin clicks "Schedule Update"
    And the admin selects scheduled time: "2026-04-05 02:00 AM"
    And the admin confirms scheduled update
    Then the update is queued and scheduled
    And a notification is shown: "Update scheduled for 2026-04-05 02:00 AM"
    And at the scheduled time, all fares are updated simultaneously
    And affected drivers receive notification of fare change
    And audit log shows scheduled vs. immediate update


# Feature 3: Real-Time Fleet Monitoring
# ============================================================================
Feature: Real-Time Fleet Monitoring
  As an Admin
  I want to monitor active drivers and rides in real-time
  So that I can ensure service quality, respond to emergencies, and optimize operations

  Background:
    # Foundational prerequisites for fleet monitoring
    Given the admin user is authenticated and authorized with "FLEET_MONITORING" permission
    And the admin user has any admin role ("ADMIN", "OPERATIONS", "SUPPORT")
    And the system has live location data from active drivers
    And the system has active rides with real-time status updates
    And service zones are defined with geographic boundaries

  # Happy Path: View Live Fleet Map
  Scenario: Monitor active drivers on real-time fleet map
    Given there are 150 active drivers online across service zones
    When the admin navigates to "Fleet Monitoring" dashboard
    And the map displays all active drivers
    Then the map shows:
      | Element                    | Details                          |
      | Driver Locations           | Green dots with vehicle icons    |
      | Active Rides               | Blue lines connecting driver-pax |
      | Idle Drivers               | Yellow dots (no active ride)     |
      | Service Zone Boundaries    | Shaded regions on map            |
      | Customer Hotspots          | Density heat map overlay         |
    And the admin can zoom in/out and pan across service areas
    And vehicle type icons are distinguishable (Sedan, SUV, Van)
    And the map updates in real-time every 5 seconds

  # Happy Path: View Active Ride Details
  Scenario: Inspect details of an active ride
    Given an active ride is in progress with ID "RIDE-98765"
    When the admin clicks on the active ride on the fleet map
    Then a side panel displays comprehensive ride details:
      | Section              | Information                        |
      | Ride Information     | ID, status, start time, duration  |
      | Passenger Details    | Name, rating, customer ID         |
      | Driver Details       | Name, vehicle, rating, ID         |
      | Route Information    | Pickup address, destination, ETA  |
      | Fare Details         | Base, distance, time, surge, total |
      | GPS Coordinates      | Current driver location, accuracy |
    And the admin can see the driver's live location on map
    And the admin can see the ride's route and destination
    And the admin can flag the ride for investigation if needed

  # Happy Path: Monitor Idle Drivers
  Scenario: View idle drivers available for dispatch
    Given multiple drivers are idle (not in active ride)
    When the admin navigates to "Fleet Monitoring"
    And the admin filters for "Idle Drivers Only"
    Then the map displays only idle drivers as yellow dots
    And a list shows idle drivers with:
      | Column            | Value                          |
      | Driver Name       | Full name                      |
      | Vehicle Type      | Vehicle category               |
      | Location          | Current zone/address           |
      | Idle Duration     | Time since last ride completed |
      | Rating            | Driver's average rating        |
      | Availability      | Online status                  |
    And the admin can sort by idle duration, location, or rating
    And the admin can click any driver to view their profile

  # Happy Path: Emergency Flag Handling
  Scenario: Flag a ride as requiring emergency attention
    Given an active ride is displayed on the fleet map
    When the admin clicks on the ride
    And the admin clicks "Flag Emergency"
    And the admin selects emergency type: "Safety concern - aggressive passenger"
    And the admin provides notes: "Driver reports passenger behavior escalating"
    And the admin confirms flag
    Then the ride is marked with red emergency indicator on map
    And the ride details show emergency flag with timestamp
    And support team is automatically notified
    And the driver's ride is flagged in their app interface
    And the system records the emergency action in audit log
    And the admin receives confirmation of flag action

  # Happy Path: Manual Dispatch for Phone Booking
  Scenario: Manually dispatch driver for phone booking
    Given a customer calls 1-800-TAXI requesting a ride
    And the pickup location is "Main St & 5th Ave"
    When the admin navigates to "Manual Dispatch"
    And the admin enters customer details:
      | Field           | Value                  |
      | Phone Number    | +1-555-123-4567       |
      | Pickup Address  | Main St & 5th Ave      |
      | Destination     | Airport Terminal 2     |
      | Vehicle Type    | Standard Sedan         |
      | Special Requests| Wheelchair accessible  |
    And the system identifies 8 available drivers within 2km
    And the admin selects driver "DRV-08642" (closest, 0.5km away)
    And the admin clicks "Dispatch"
    Then the ride is created with status "DRIVER_ASSIGNED"
    And the selected driver receives push notification "Ride assigned: Main St & 5th Ave"
    And the ride appears on the driver's app with all details
    And the phone booking is recorded with admin name and timestamp
    And the customer receives SMS confirmation with driver name and ETA

  # Happy Path: View Driver Performance Real-Time Metrics
  Scenario: Monitor key driver performance metrics
    Given the admin is viewing the fleet monitoring dashboard
    When the admin clicks "Performance Metrics" panel
    Then the admin sees real-time metrics:
      | Metric                | Example              |
      | Total Active Drivers   | 147 online           |
      | Total Active Rides     | 89 rides in progress |
      | Average Wait Time      | 4.2 minutes          |
      | Average Rating (Today) | 4.7 stars            |
      | Cancellation Rate      | 2.1%                 |
      | Completion Rate        | 97.9%                |
    And each metric is updated every 30 seconds
    And the admin can click on any metric to drill down into details
    And a sparkline graph shows 24-hour trend for each metric

  # Alternative Path: Filter Fleet by Multiple Criteria
  Scenario: View filtered subset of fleet based on criteria
    Given the admin wants to monitor drivers in low-availability zone
    When the admin navigates to "Fleet Monitoring"
    And the admin applies filters:
      | Filter Type  | Value                      |
      | Service Zone | "Airport" zone only        |
      | Vehicle Type | "Premium Sedan" vehicles   |
      | Rating Range | 4.5+ stars only            |
      | Status       | "Idle" drivers             |
    And the admin applies filters
    Then the map displays only matching drivers (15 drivers)
    And the list on left shows 15 filtered drivers
    And the filter criteria are displayed as active tags
    And the admin can remove individual filters or clear all
    And the filtering persists across map pan/zoom actions

  # Alternative Path: View Historical Ride Details
  Scenario: Examine completed ride details for quality monitoring
    Given a ride was completed 30 minutes ago with ID "RIDE-98765"
    When the admin searches for ride "RIDE-98765"
    And the admin clicks "View Details"
    Then the admin sees completed ride information:
      | Section              | Information                |
      | Ride Timeline        | Booking, pickup, drop-off  |
      | Route Map            | Actual route taken         |
      | Passenger Rating     | Rating and feedback        |
      | Driver Rating        | Rating given by passenger  |
      | Fare Breakdown       | All fare components        |
      | Fare Adjustment      | Any refunds or adjustments |
      | Total Duration       | Total trip time            |
      | GPS Accuracy Info    | Route deviation analysis   |
    And the admin can download trip details as PDF
    And the admin can flag the ride for dispute investigation

  # Alternative Path: Monitor Specific Driver in Detail
  Scenario: Track single driver's real-time movements and metrics
    Given the admin wants to closely monitor driver "DRV-12345"
    When the admin navigates to "Fleet Monitoring"
    And the admin searches for driver "DRV-12345"
    And the admin clicks "Track Driver"
    Then the map zooms to driver's current location
    And a detailed tracking panel shows:
      | Element                   | Details                        |
      | Driver Info               | Photo, name, rating, vehicle   |
      | Real-Time Location        | Live GPS coordinates, address  |
      | Current Activity          | Active ride or idle            |
      | Today's Metrics           | Rides completed, earnings      |
      | Upcoming Ride             | Next scheduled ride if queued  |
      | Location History (last hr)| Path taken with timestamps     |
      | Heading & Speed           | Direction and speed in mph     |
    And the tracking updates every 5 seconds
    And the admin can place manual dispatch request for this driver
    And the admin can send driver a message
    And the admin can trigger a phone call to driver

  # Error Case: Cannot flag ride without selecting reason
  Scenario: Attempt to flag emergency without selecting emergency type
    Given an active ride is displayed
    When the admin clicks "Flag Emergency"
    And the admin attempts to confirm without selecting emergency type
    Then the system displays error: "Emergency type is required"
    And the emergency type dropdown is highlighted
    And the confirm button is disabled

  # Error Case: Dispatch to unavailable driver
  Scenario: Attempt to manually dispatch to driver who just went offline
    Given the admin is in "Manual Dispatch" mode
    And the system shows 8 available drivers
    And the admin selects driver "DRV-08642"
    But the driver goes offline before dispatch confirmation
    When the admin clicks "Dispatch"
    Then the system displays error: "Driver is no longer available - status changed to offline"
    And the system automatically refreshes available driver list
    And the admin is prompted to select another driver

  # Edge Case: Dispatch phone booking during peak surge period
  Scenario: Manually dispatch during high-demand surge period
    Given current surge multiplier is 3.0x (extreme demand)
    And a customer calls requesting ride via phone
    When the admin navigates to "Manual Dispatch"
    And the admin enters pickup and destination
    And the system calculates estimated fare: $45 (with 3.0x surge)
    And the admin verifies customer is aware of surge pricing
    And the admin clicks "Dispatch"
    Then the ride is created with surge multiplier applied
    And the customer confirmation includes surge explanation
    And the driver is notified of high-demand period status
    And the surge multiplier is locked for this ride regardless of future changes

  # Business rationale: Ensures customer is informed of surge pricing before driver assignment

  # Edge Case: Monitor driver behavior during off-hours
  Scenario: Track driver movements in low-activity hours
    Given the current time is 3:00 AM (off-peak hours)
    And only 12 drivers are online
    When the admin navigates to "Fleet Monitoring"
    Then the fleet map shows sparse driver distribution
    And the admin sees heat map highlighting customer concentration
    And the system may suggest repositioning drivers to high-demand areas
    And the admin can observe driver idle time metrics
    And the system logs any unusual movement patterns for quality assurance


# Feature 4: Surge Pricing Configuration
# ============================================================================
Feature: Surge Pricing Configuration
  As an Admin
  I want to configure and manage dynamic surge pricing rules
  So that supply and demand are balanced while maximizing revenue

  Background:
    # Foundational prerequisites for surge pricing
    Given the admin user is authenticated and authorized with "SURGE_PRICING_MANAGEMENT" permission
    And the admin user has "ADMIN" or "OPERATIONS" role
    And the system has service zones defined with historical demand patterns
    And the system tracks real-time driver availability and ride demand

  # Happy Path: Create Utilization-Based Surge Rule
  Scenario: Create surge rule triggered by driver availability
    Given the admin is on "Surge Pricing Configuration" page
    When the admin clicks "Create New Surge Rule"
    And the admin selects rule type: "Utilization-Based"
    And the admin enters rule details:
      | Field                  | Value          |
      | Rule Name              | High Demand    |
      | Service Zone           | Downtown       |
      | Trigger Threshold      | 85% utilization |
      | Surge Multiplier       | 1.5x           |
      | Maximum Multiplier Cap | 2.5x           |
    And the admin clicks "Save Rule"
    Then the surge rule is created with status "ACTIVE"
    And the rule is stored in the system
    And a success message confirms: "Surge rule 'High Demand' created successfully"
    And the admin can view the rule in the active rules list

  # Happy Path: Create Time-Based Surge Rule
  Scenario: Create surge rule triggered by time of day
    Given the admin is on "Surge Pricing Configuration" page
    When the admin clicks "Create New Surge Rule"
    And the admin selects rule type: "Time-Based"
    And the admin enters rule details:
      | Field              | Value                |
      | Rule Name          | Evening Rush Hour    |
      | Service Zone       | Downtown             |
      | Trigger Time Range | 5:00 PM - 7:00 PM   |
      | Days of Week       | Monday - Friday      |
      | Surge Multiplier   | 1.8x                 |
      | Maximum Cap        | 2.5x                 |
    And the admin clicks "Save Rule"
    Then the time-based surge rule is created
    And the rule automatically activates during 5-7 PM on weekdays
    And the system shows rule in active rules list with schedule details
    And a preview shows when this rule will next activate

  # Happy Path: Create Zone-Based Surge Rule
  Scenario: Create surge rule for specific geographic zone
    Given the admin is on "Surge Pricing Configuration" page
    When the admin clicks "Create New Surge Rule"
    And the admin selects rule type: "Zone-Based"
    And the admin enters rule details:
      | Field              | Value              |
      | Rule Name          | Airport Surge      |
      | Service Zone       | Airport (custom)   |
      | Geographic Area    | 5km radius of airport |
      | Trigger Condition  | Demand > 120 rides/hour |
      | Surge Multiplier   | 2.0x               |
      | Maximum Cap        | 3.0x               |
    And the admin draws the geographic area on map
    And the admin clicks "Save Rule"
    Then the zone-based surge rule is created
    And the system monitors demand within this geographic zone only
    And surge activates automatically when demand threshold is exceeded
    And the surge applies only to rides within the defined zone

  # Happy Path: Disable Active Surge Rule
  Scenario: Deactivate an active surge pricing rule
    Given surge rule "Evening Rush Hour" is currently active
    When the admin navigates to "Surge Pricing Configuration"
    And the admin selects rule "Evening Rush Hour"
    And the admin clicks "Disable Rule"
    And the admin confirms disabling the rule
    Then the rule status changes from "ACTIVE" to "DISABLED"
    And surge pricing stops being applied from this rule
    And existing rides with this surge continue to completion at locked price
    And new rides no longer use this surge rule
    And a notification shows rule disabled by admin with timestamp

  # Happy Path: Set Maximum Surge Cap
  Scenario: Configure global maximum surge cap
    Given the admin is on "Surge Pricing Configuration" page
    When the admin navigates to "Global Settings"
    And the admin sets "Maximum Surge Multiplier Cap": "3.5x"
    And the admin provides rationale: "Prevent extreme surge situations"
    And the admin clicks "Save Settings"
    Then the system applies 3.5x as absolute maximum across all surge rules
    And no rule can exceed 3.5x multiplier regardless of demand
    And existing rules with higher caps are capped at 3.5x
    And notification is sent to operations team about new cap

  # Happy Path: View Surge Rule Performance
  Scenario: Review analytics for active surge rule
    Given surge rule "High Demand" has been active for 30 days
    When the admin selects rule "High Demand"
    And the admin clicks "View Performance Analytics"
    Then the admin sees metrics:
      | Metric                    | Value      |
      | Total Activations         | 48 times   |
      | Average Activation Duration | 23 minutes |
      | Total Rides During Surge  | 1,247      |
      | Revenue Increase from Surge | $12,450   |
      | Customer Cancellation Rate | 8.2%       |
      | Driver Acceptance Rate    | 96.3%      |
    And a graph shows surge multiplier over time for last 7 days
    And the admin can export performance report

  # Alternative Path: Create Multi-Zone Surge Rule
  Scenario: Apply surge rule across multiple zones simultaneously
    Given the admin is on "Surge Pricing Configuration" page
    When the admin clicks "Create New Surge Rule"
    And the admin selects rule type: "Utilization-Based"
    And the admin enters rule name: "System-Wide High Demand"
    And the admin selects service zones: "Downtown", "Airport", "Suburban" (multi-select)
    And the admin sets trigger threshold: "80% utilization"
    And the admin sets multiplier: "1.6x" with cap "2.5x"
    And the admin clicks "Save Rule"
    Then the rule applies to all three selected zones
    And each zone's utilization is monitored independently
    And surge activates when any zone reaches 80% utilization
    And the multiplier is applied zone-specifically

  # Alternative Path: Temporarily Suspend All Surge Pricing
  Scenario: Disable all surge pricing for special event
    Given special event (emergency, weather) requires normal pricing
    When the admin navigates to "Surge Pricing Configuration"
    And the admin clicks "Emergency Override"
    And the admin selects reason: "Severe weather - assist customers"
    And the admin sets duration: "Until 6:00 AM" (4 hours)
    And the admin provides notes: "All surge rules disabled due to severe weather"
    And the admin confirms override
    Then all active surge rules are suspended
    And all active rides continue with surge locked, new rides use 1.0x
    And a notification is sent to all drivers: "Surge pricing temporarily disabled"
    And the system logs the override with reason and duration
    And surge rules automatically resume after 4 hours

  # Alternative Path: Review Surge Rule Before Activation
  Scenario: Preview surge rule impact before enabling
    Given a new surge rule has been created but not yet activated
    When the admin selects the draft rule
    And the admin clicks "Preview Impact"
    Then the system shows:
      | Impact Element             | Details                        |
      | Customer Impact            | Est. price increase 15-25%     |
      | Driver Impact              | Est. earnings increase 15-25%  |
      | Historical Activations     | Based on past patterns, 10/day |
      | Revenue Impact (estimated) | $15,000/month based on volume |
      | Potential Cancellation Rate| Est. increase from 3% to 5.2% |
    And the admin can adjust multiplier and see live impact updates
    And the admin confirms understanding before final activation

  # Error Case: Cannot create overlapping surge rules
  Scenario: Attempt to create second surge rule for same zone/time
    Given surge rule "Evening Rush Hour" (5-7 PM Downtown) is active
    When the admin creates new rule with same parameters:
      | Field              | Value                |
      | Rule Type          | Time-Based           |
      | Service Zone       | Downtown             |
      | Time Range         | 5:15 PM - 6:45 PM   |
    And the admin clicks "Save Rule"
    Then the system displays error: "Overlapping surge rule already exists for this zone and time"
    And the system suggests options:
      | Option                                  |
      | Modify existing rule instead            |
      | Select different zone or time range     |
      | Adjust rule to avoid overlap            |

  # Business rationale: Prevents conflicting multipliers from being applied

  # Error Case: Surge multiplier exceeds global cap
  Scenario: Attempt to set surge multiplier higher than global cap
    Given global maximum surge cap is set to 3.0x
    When the admin creates new surge rule
    And the admin enters multiplier: "4.0x"
    And the admin clicks "Save Rule"
    Then the system displays error: "Multiplier exceeds global cap of 3.0x"
    And the multiplier field is highlighted
    And the maximum allowed value is shown: "3.0x"

  # Error Case: Invalid time range for time-based rule
  Scenario: Attempt to create time-based rule with invalid hours
    Given the admin is creating time-based surge rule
    When the admin enters time range: "8:00 PM - 7:00 PM" (end before start)
    And the admin clicks "Save Rule"
    Then the system displays error: "End time must be after start time"
    And both time fields are highlighted
    And the save button remains disabled

  # Edge Case: Surge rule activation during existing surge
  Scenario: New surge rule activates while different rule already active
    Given surge rule "Evening Rush" is currently active with 1.8x multiplier
    And the time reaches 5:00 PM when "Evening Surge Plus" rule activates
    When both rules trigger simultaneously
    Then the system applies the HIGHER multiplier: 1.8x or 2.1x (whichever is greater)
    And the active ride details show which rule is applied
    And the audit log shows both rules triggered with combined impact
    And customers are charged based on the higher multiplier

  # Business rationale: Prevents conflicting rules from reducing expected surge pricing

  # Edge Case: Automatic deactivation when surge threshold no longer met
  Scenario: Surge pricing automatically deactivates after utilization drops
    Given utilization-based surge rule with 85% trigger threshold
    And current utilization is 88% with surge 1.5x active
    When utilization drops to 82% (below trigger threshold)
    Then the system automatically deactivates surge for this rule
    And new rides no longer use surge multiplier
    And existing active rides keep locked surge multiplier
    And the deactivation is logged with timestamp and trigger reason
    And a notification is sent to operations team


# Feature 5: Promotion and Coupon Management
# ============================================================================
Feature: Promotion and Coupon Management
  As an Admin
  I want to create and manage promotions and coupons
  So that I can drive customer acquisition, increase loyalty, and optimize pricing

  Background:
    # Foundational prerequisites for promotion management
    Given the admin user is authenticated and authorized with "PROMOTION_MANAGEMENT" permission
    And the admin user has "ADMIN" or "OPERATIONS" role
    And the system has customer segments and zones defined
    And the system tracks promotion usage and redemption

  # Happy Path: Create Percentage Discount Promotion
  Scenario: Create percentage-based promotion
    Given the admin is on "Promotion Management" page
    When the admin clicks "Create New Promotion"
    And the admin selects promotion type: "Percentage Discount"
    And the admin enters promotion details:
      | Field                  | Value                    |
      | Promotion Name         | Spring Launch Campaign   |
      | Description            | 20% off first 5 rides    |
      | Discount Type          | Percentage               |
      | Discount Amount        | 20%                      |
      | Maximum Discount Cap   | $15.00 per ride          |
      | Applicable Vehicle Types | All                    |
      | Valid Date Range       | 2026-04-05 - 2026-05-05 |
      | Promo Code (optional)  | SPRING20                 |
    And the admin clicks "Create Promotion"
    Then the promotion is created with status "DRAFT"
    And the admin can review promotion details before activation
    And a unique promotion ID is generated
    And the promotion appears in the promotions list

  # Happy Path: Create Fixed Amount Promotion
  Scenario: Create flat-rate discount promotion
    Given the admin is on "Promotion Management" page
    When the admin clicks "Create New Promotion"
    And the admin selects promotion type: "Fixed Amount Discount"
    And the admin enters promotion details:
      | Field                  | Value                  |
      | Promotion Name         | $5 Off Weekend Rides   |
      | Description            | Save $5 on weekend     |
      | Discount Type          | Fixed Amount           |
      | Discount Amount        | $5.00                  |
      | Applicable Vehicle Types | Standard, Premium    |
      | Valid Date Range       | 2026-04-12 - 2026-04-28 |
      | Days of Week           | Saturday, Sunday       |
    And the admin clicks "Create Promotion"
    Then the promotion is created with status "DRAFT"
    And a preview shows sample rides with $5 discount applied
    And the promotion can be activated or modified before launch

  # Happy Path: Apply Area Restrictions to Promotion
  Scenario: Limit promotion to specific geographic zones
    Given the admin has created promotion "Summer Special"
    When the admin clicks "Edit Restrictions"
    And the admin selects restriction type: "Geographic Zone"
    And the admin selects zones: "Downtown", "Airport", "Suburban"
    And the admin specifies: "Promotion valid for rides starting in these zones only"
    And the admin clicks "Save Restrictions"
    Then the promotion is restricted to selected zones
    And rides starting outside zones cannot use this promotion
    And a zone-restricted tag is displayed on promotion details
    And customers see zone availability when viewing promotion

  # Happy Path: Apply Time Restrictions to Promotion
  Scenario: Limit promotion to specific times and days
    Given the admin has created promotion "Night Owls Discount"
    When the admin clicks "Edit Restrictions"
    And the admin selects restriction type: "Time-Based"
    And the admin enters restrictions:
      | Field           | Value              |
      | Valid Days      | Monday - Sunday    |
      | Valid Hours     | 10:00 PM - 6:00 AM |
      | Blackout Dates  | Dec 24-25, Jan 1   |
    And the admin clicks "Save Restrictions"
    Then the promotion is valid only during specified hours
    And rides booked outside valid hours cannot use promotion
    And customers see time restrictions in promotion details
    And the system automatically enforces restrictions

  # Happy Path: Set Global Usage Limits
  Scenario: Configure global usage cap for promotion
    Given the admin has created promotion "Launch Campaign"
    When the admin clicks "Set Usage Limits"
    And the admin enters limits:
      | Limit Type              | Value      |
      | Total Uses (Global)     | 1,000 uses |
      | Daily Limit             | 100 uses   |
      | Per Customer Limit      | 5 uses     |
      | Minimum Ride Value      | $15.00     |
    And the admin clicks "Save Limits"
    Then the promotion has global usage restrictions
    And once 1,000 total uses are reached, promotion auto-deactivates
    And daily limit of 100 prevents excessive daily usage
    And each customer can use promotion maximum 5 times
    And promotion can only be used on rides of $15 or more

  # Happy Path: Set Per-Customer Usage Limits
  Scenario: Configure per-customer usage restrictions
    Given the admin has created promotion "New Customer Offer"
    When the admin clicks "Set Usage Limits"
    And the admin enters limits:
      | Limit Type           | Value       |
      | Applicable To        | New customers only (first 30 days) |
      | Per Customer Limit   | 3 uses      |
      | Lifetime Limit       | Unlimited   |
      | Minimum Ride Value   | $10.00      |
    And the admin clicks "Save Limits"
    Then the promotion applies only to customers with accounts < 30 days old
    And each new customer can use promotion maximum 3 times
    And there's no global usage cap (runs indefinitely for new customers)
    And the system tracks customer account age for eligibility

  # Happy Path: Activate Promotion
  Scenario: Activate promotion and make live
    Given promotion "Spring Launch Campaign" is in "DRAFT" status
    When the admin navigates to the promotion
    And the admin clicks "Activate Promotion"
    And the admin reviews all settings in final checklist
    And the admin confirms activation
    Then the promotion status changes to "ACTIVE"
    And the promotion is immediately available to customers
    And customers can use promo code "SPRING20" in the app
    And the system starts tracking usage metrics
    And an audit log entry records promotion activation

  # Happy Path: View Promotion Performance Analytics
  Scenario: Review promotion usage and performance metrics
    Given promotion "Spring Campaign" has been active for 14 days
    When the admin selects the promotion
    And the admin clicks "View Analytics"
    Then the admin sees comprehensive metrics:
      | Metric                        | Value      |
      | Total Uses                    | 487 rides  |
      | Unique Customers              | 312 customers |
      | Total Discount Amount Issued  | $2,435.00  |
      | Average Discount Per Ride     | $5.00      |
      | Customer Redemption Rate      | 38.5%      |
      | Revenue Lift (attributed)     | $8,200     |
      | New Customer Acquisition      | 89 customers |
      | Repeat User Rate              | 45.2%      |
    And a graph shows daily usage trend
    And a breakdown by customer segment shows performance per segment
    And the admin can export full performance report as CSV

  # Happy Path: Deactivate Promotion Early
  Scenario: Manually deactivate active promotion
    Given promotion "Spring Campaign" is in "ACTIVE" status
    And the promotion has 487 uses and expires in 14 days
    When the admin navigates to the promotion
    And the admin clicks "Deactivate Early"
    And the admin selects reason: "Campaign exceeded targets early"
    And the admin provides notes: "Shift focus to summer campaign"
    And the admin confirms deactivation
    Then the promotion status changes to "INACTIVE"
    And customers can no longer use this promotion
    And active rides with locked discount are unaffected
    And new rides cannot apply this promotion
    And a final performance report is generated
    And the deactivation is logged with admin name and reason

  # Happy Path: Auto-Deactivation on Expiry
  Scenario: Promotion automatically deactivates at expiry date
    Given promotion "Spring Campaign" expires on 2026-05-05 at 11:59 PM
    When the expiry date and time is reached
    Then the system automatically deactivates the promotion
    And the promotion status changes from "ACTIVE" to "EXPIRED"
    And customers can no longer use this promotion
    And a notification is sent to operations team about expiry
    And the final usage report is automatically generated
    And the promotion data is archived for historical reference

  # Alternative Path: Create Stacked Promotion
  Scenario: Allow multiple promotions to be combined
    Given customer has already applied promotion "Welcome Offer" ($3 discount)
    When the customer attempts to apply second promotion "Weekend Special" (15% off)
    And the system policy allows stacking
    Then both promotions are applied simultaneously
    And the final discount combines both offers
    And the ride details show both promotions applied
    And usage counters increment for both promotions
    And the audit log records both promotions used on same ride

  # Business rationale: Increases perceived value and encourages usage

  # Alternative Path: Clone Existing Promotion
  Scenario: Create new promotion based on existing one
    Given promotion "Spring Campaign" is successfully running
    When the admin navigates to "Promotion Management"
    And the admin selects promotion "Spring Campaign"
    And the admin clicks "Clone Promotion"
    And the admin modifies cloned details:
      | Field              | New Value             |
      | Promotion Name     | Summer Campaign       |
      | Discount Amount    | 25%                   |
      | Valid Date Range   | 2026-06-01 - 2026-08-31 |
    And the admin saves cloned promotion
    Then a new promotion "Summer Campaign" is created in DRAFT status
    And all settings except modified fields are copied from original
    And the cloned promotion is independent from original
    And both promotions can run simultaneously with different schedules

  # Alternative Path: Export Promotion Data
  Scenario: Export promotion usage data to CSV
    Given promotion "Spring Campaign" has completed
    When the admin selects the promotion
    And the admin clicks "Export Data"
    And the admin selects export format: "CSV"
    And the admin confirms export
    Then a CSV file is generated containing:
      | Column              | Data                          |
      | Ride ID             | Unique ride identifier        |
      | Customer ID         | Who used the promotion        |
      | Discount Amount     | Dollar amount discounted      |
      | Ride Value          | Original ride fare            |
      | Final Price         | Price after promotion         |
      | Timestamp           | When promotion was used       |
      | Vehicle Type        | Applicable vehicle type       |
      | Service Zone        | Where ride occurred           |
    And the CSV file is downloaded to admin's computer
    And the admin can import into analytics tools for deeper analysis

  # Error Case: Cannot create promotion with invalid discount
  Scenario: Attempt to create promotion with 0% discount
    Given the admin is creating percentage-based promotion
    When the admin enters discount: "0%"
    And the admin clicks "Create Promotion"
    Then the system displays error: "Discount must be greater than 0%"
    And the discount field is highlighted
    And the create button is disabled

  # Error Case: Invalid date range
  Scenario: Attempt to create promotion with end date before start date
    Given the admin is creating promotion
    When the admin enters dates:
      | Start Date | 2026-05-01 |
      | End Date   | 2026-04-01 |
    And the admin clicks "Create Promotion"
    Then the system displays error: "End date must be after start date"
    And both date fields are highlighted
    And the create button is disabled

  # Error Case: Per-customer limit exceeds global limit
  Scenario: Attempt to set per-customer limit higher than global limit
    Given the admin is setting usage limits
    When the admin enters limits:
      | Global Limit      | 100 uses      |
      | Per Customer Limit | 150 uses     |
    And the admin clicks "Save Limits"
    Then the system displays error: "Per-customer limit cannot exceed global limit"
    And the per-customer field is highlighted
    And a suggestion shows per-customer limit adjusted to 100

  # Error Case: Cannot deactivate already expired promotion
  Scenario: Attempt to deactivate promotion that already expired
    Given promotion "Spring Campaign" has status "EXPIRED"
    When the admin selects the promotion
    And the admin clicks "Deactivate Early"
    Then the system displays error: "Cannot deactivate - promotion already expired"
    And a button "View Final Report" is shown instead
    And the admin is prompted to archive or delete the promotion

  # Edge Case: Promotion nearing usage limit
  Scenario: System alerts admin when promotion approaches global limit
    Given promotion "Spring Campaign" has global limit of 1,000 uses
    And the promotion currently has 920 uses
    When the admin navigates to "Promotion Management"
    Then the system displays warning on promotion card: "980/1000 uses - limit near"
    And a yellow alert indicator shows on the promotion
    And the admin can click to extend the global limit or deactivate promotion
    And automated notification is sent to operations team

  # Edge Case: Last customer use of per-customer limit
  Scenario: Customer uses final permitted use of promotion
    Given promotion "New Customer Offer" allows 3 uses per customer
    And customer has used this promotion 2 times
    When the customer attempts to use promotion for 3rd time
    Then the promotion is successfully applied (final use)
    And the system displays notice: "This is your last use of this promotion"
    And the customer is informed in ride details
    And after ride completion, the customer can no longer use this promotion
    And the admin sees updated usage count in analytics dashboard


# Feature 6: Commission Management
# ============================================================================
Feature: Commission Management
  As an Admin
  I want to configure and manage driver commissions
  So that I can maintain healthy driver economics while protecting platform margins

  Background:
    # Foundational prerequisites for commission management
    Given the admin user is authenticated and authorized with "COMMISSION_MANAGEMENT" permission
    And the admin user has "ADMIN" or "FINANCE" role
    And the system has driver commission records with historical data
    And the system tracks all earnings and payout details

  # Happy Path: Set Default Commission Rate
  Scenario: Configure default commission percentage for all drivers
    Given the admin is on "Commission Management" dashboard
    When the admin clicks "Set Default Commission"
    And the admin enters commission details:
      | Field                      | Value        |
      | Default Commission Rate    | 20%          |
      | Effective Date             | 2026-04-15   |
      | Minimum Commission per Ride | $0.50       |
      | Commission on Tips         | No (0%)      |
    And the admin provides rationale: "Increase from 18% to fund safety features"
    And the admin confirms setting
    Then the default commission is set to 20%
    And all existing and new drivers use this rate unless overridden
    And the rate becomes effective on specified date
    And existing pending payouts use old rate, new rides use new rate
    And finance team receives notification of rate change

  # Happy Path: Set Vehicle Type Commission Rates
  Scenario: Configure different commission rates by vehicle type
    Given the admin is on "Commission Management" dashboard
    When the admin clicks "Vehicle Type Commissions"
    And the admin sets commission rates per vehicle type:
      | Vehicle Type      | Commission Rate | Notes                    |
      | Economy           | 18%             | Lower margin to encourage drivers |
      | Standard Sedan    | 20%             | Default rate             |
      | Premium Sedan     | 22%             | Higher margin, selective market |
      | SUV               | 21%             | Mid-tier rate            |
      | XL Van            | 20%             | Baseline for fleet        |
    And the admin sets effective date: "2026-04-15"
    And the admin clicks "Save Vehicle Rates"
    Then each vehicle type has its own commission rate
    And the system applies correct rate based on driver's vehicle type
    And drivers can see their commission rate based on vehicle
    And historical commission rates are archived for reporting
    And audit log shows all rate changes with effective dates

  # Happy Path: Create Temporary Reduced Commission for New Drivers
  Scenario: Offer reduced commission to newly onboarded drivers
    Given the admin wants to incentivize new driver onboarding
    When the admin clicks "New Driver Incentives"
    And the admin creates incentive program:
      | Field                        | Value            |
      | Program Name                 | New Driver Boost  |
      | Applicable To                | Drivers < 30 days old |
      | Reduced Commission Rate      | 12%              |
      | Standard Rate                | 20%              |
      | Duration                     | 30 days          |
      | Minimum Rides Required       | 25 rides         |
    And the admin sets effective date: "2026-04-15"
    And the admin clicks "Activate Program"
    Then new drivers automatically receive 12% commission for 30 days
    And drivers see the incentive rate in their earnings dashboard
    And after 30 days or 25 rides, drivers switch to standard 20% rate
    And a notification is sent to drivers about rate change
    And program completion is tracked and reported

  # Happy Path: Configure "No Commission on Tips"
  Scenario: Set platform to not charge commission on driver tips
    Given the admin is on "Commission Management" dashboard
    When the admin clicks "Tip Commission Policy"
    And the admin selects option: "Do not charge commission on tips"
    And the admin provides rationale: "Tips reward good service, should go entirely to driver"
    And the admin confirms setting
    Then the system is configured to not deduct commission from tip amounts
    And 100% of tips go directly to drivers
    And this policy applies to all drivers regardless of rate tier
    And customers see messaging: "100% of tip goes to driver"
    And the audit log records policy change with timestamp

  # Happy Path: View Commission Report
  Scenario: Generate comprehensive commission report
    Given the admin is on "Commission Management" dashboard
    When the admin clicks "Commission Reports"
    And the admin selects report date range: "2026-03-01 to 2026-03-31"
    And the admin clicks "Generate Report"
    Then the system generates report showing:
      | Metric                      | Value       |
      | Total Rides                 | 12,450      |
      | Total Ride Revenue          | $189,200    |
      | Total Commission Collected  | $37,840     |
      | Average Commission per Ride | $3.04       |
      | Commission by Vehicle Type  | Breakdown   |
      | New Driver Incentives Given | $2,340      |
      | Commission by Driver        | List        |
    And a breakdown shows commission collected vs. driver payouts
    And the admin can sort by driver, vehicle type, or amount
    And the report can be exported as PDF or CSV

  # Happy Path: View Individual Driver Commission
  Scenario: Review commission details for specific driver
    Given driver "DRV-12345" is in the system
    When the admin navigates to the driver's profile
    And the admin clicks "Commission Details"
    Then the admin sees:
      | Section                | Information                    |
      | Commission Rate        | 20% (Standard Sedan)           |
      | Incentive Status       | Not eligible (30+ days)        |
      | Current Period Earnings | $4,250 gross                   |
      | Current Period Commission | $850 (20%)                 |
      | Driver Payout          | $3,400 net                     |
      | Last Payout Date       | 2026-03-31                     |
      | Next Scheduled Payout  | 2026-04-07                     |
      | Year-to-Date Commission | $12,340                       |
    And a monthly breakdown shows commission collected each month
    And the admin can view tips received and their treatment

  # Alternative Path: Adjust Commission for Underperforming Driver
  Scenario: Temporarily reduce commission rate for driver quality issues
    Given driver "DRV-12345" has 10 low ratings and 5 cancellations recently
    When the admin reviews driver performance
    And the admin clicks "Adjust Commission Rate"
    And the admin enters adjustment:
      | Field                  | Value             |
      | Current Rate           | 20%               |
      | Adjusted Rate          | 25%               |
      | Reason for Adjustment  | Quality concerns  |
      | Duration               | 60 days           |
      | Action                 | Review after period |
    And the admin confirms adjustment
    Then the driver's commission rate increases to 25% for 60 days
    And the driver is notified of the adjustment with reason
    And the driver's earning dashboard shows adjusted rate
    And after 60 days, the rate reverts to 20% automatically
    And a reminder is created to review driver performance

  # Business rationale: Incentivizes quality improvement without deactivating driver

  # Alternative Path: Restore Commission to Penalized Driver
    Scenario: Restore normal commission after remedial action
    Given driver "DRV-12345" is on elevated commission (25%) for quality issues
    And the driver has completed 80 rides with 4.7+ avg rating
    When the admin reviews driver performance
    And the admin determines driver has improved
    And the admin clicks "Restore Commission"
    And the admin confirms restoration to original rate
    Then the driver's commission rate reverts to 20%
    And the driver is notified: "Commission rate restored to 20%"
    And the change is effective immediately for new rides
    And the restoration is logged in driver's history

  # Error Case: Cannot set commission rate above 100%
  Scenario: Attempt to set invalid commission rate
    Given the admin is setting default commission
    When the admin enters commission rate: "120%"
    And the admin clicks "Save Default Commission"
    Then the system displays error: "Commission rate must be between 0% and 100%"
    And the rate field is highlighted
    And the save button is disabled

  # Error Case: Cannot set negative minimum commission
  Scenario: Attempt to set negative minimum commission per ride
    Given the admin is setting commission details
    When the admin enters minimum commission: "-$0.50"
    And the admin clicks "Save"
    Then the system displays error: "Minimum commission must be greater than or equal to $0"
    And the field is highlighted
    And the save button remains disabled

  # Error Case: Vehicle type commission exceeds default rate
  Scenario: Warn admin when vehicle-specific rate exceeds default
    Given default commission is set to 20%
    When the admin sets Premium Sedan commission: "22%"
    And the admin sets Standard Sedan commission: "25%" (exceeds default)
    And the admin clicks "Save Vehicle Rates"
    Then the system displays warning: "Standard Sedan rate (25%) exceeds default (20%)"
    And the admin must confirm the intentional override
    And if confirmed, the rate is saved with a flag for audit review

  # Edge Case: Commission rate change affecting pending payouts
  Scenario: Apply new commission rate to rides completed but not yet paid
    Given pending payout pool has $8,500 in driver earnings
    And the rides were completed under 18% commission rate
    And the default commission is changed to 22%
    When the change is applied
    Then the system determines applicable rate:
      | Status              | Commission Rate Applied |
      | Completed rides     | 18% (at ride completion time) |
      | Future rides        | 22% (new default)       |
    And existing pending payouts are NOT recalculated
    And only new rides after rate change use 22%
    And the admin is notified of rate change effective date
    And drivers see both rates clearly in earnings breakdown

  # Business rationale: Fairness principle - commission locked at ride completion time

  # Edge Case: Commission report during new driver incentive program
  Scenario: Report shows commission impact of incentive program
    Given new driver incentive program: 12% commission for 30 days
    And the program has 125 new drivers enrolled
    When the admin generates commission report for program period
    Then the report shows:
      | Breakdown              | Amount      |
      | Commission from veterans (20%) | $8,400    |
      | Commission from new drivers (12%) | $3,100   |
      | Incentive cost (foregone commission) | $2,500 |
      | Total commission collected | $11,500    |
      | Estimated driver acquisition value | $5,200  |
    And the admin can see return on investment (ROI) of incentive
    And new driver retention metrics are tracked alongside commission


# Feature 7: Analytics and Reporting
# ============================================================================
Feature: Analytics and Reporting
  As an Admin
  I want to generate and view comprehensive analytics reports
  So that I can make data-driven decisions and monitor platform health

  Background:
    # Foundational prerequisites for analytics
    Given the admin user is authenticated and authorized with "ANALYTICS_REPORTING" permission
    And the admin user has any admin role (ADMIN, OPERATIONS, FINANCE, SUPPORT)
    And the system has historical ride data and transaction records
    And the system has driver and customer data with activity logs

  # Happy Path: View Revenue Dashboard
  Scenario: Monitor daily and weekly revenue metrics
    Given the admin is on "Analytics Dashboard"
    When the admin navigates to "Revenue Dashboard"
    Then the admin sees revenue overview:
      | Metric                 | Value        | Period      |
      | Gross Revenue          | $28,450      | Today       |
      | Platform Commission    | $4,268       | Today       |
      | Driver Earnings        | $24,182      | Today       |
      | Average Ride Value     | $18.50       | Today       |
      | Total Rides            | 1,537        | Today       |
      | Revenue per Driver     | $164.50      | Today       |
    And a toggle switches between daily, weekly, monthly views
    And a graph shows 7-day revenue trend with day-over-day comparison
    And the admin can click on any day to drill down into details
    And the dashboard updates in real-time (refreshes every 30 seconds)

  # Happy Path: Filter Revenue by Vehicle Type
  Scenario: Analyze revenue breakdown by vehicle type
    Given the admin is on "Revenue Dashboard"
    When the admin clicks "View by Vehicle Type"
    Then the admin sees revenue breakdown:
      | Vehicle Type      | Total Revenue | Rides | Avg Ride | Commission |
      | Economy           | $12,450       | 845   | $14.75   | $1,868     |
      | Standard Sedan    | $18,200       | 987   | $18.43   | $3,640     |
      | Premium Sedan     | $8,900        | 412   | $21.60   | $1,958     |
      | SUV               | $6,200        | 298   | $20.81   | $1,364     |
      | XL Van            | $3,150        | 156   | $20.19   | $693       |
    And a pie chart shows revenue distribution by vehicle type
    And the admin can sort by total revenue, ride count, or average ride value
    And the admin can drill down into each vehicle type for details

  # Happy Path: Filter Revenue by Zone
  Scenario: Analyze revenue breakdown by service zone
    Given the admin is on "Revenue Dashboard"
    When the admin clicks "View by Zone"
    Then the admin sees revenue breakdown by zone:
      | Zone       | Total Revenue | Rides | Avg Ride | Peak Hour |
      | Downtown   | $14,680       | 892   | $16.47   | 5-7 PM    |
      | Airport    | $8,450        | 385   | $21.95   | 8-10 AM   |
      | Suburban   | $5,320        | 260   | $20.46   | 7-9 PM    |
    And a heatmap shows revenue density by geographic zone
    And the admin can compare zones by revenue, ride count, or surge frequency
    And the admin can export zone data for detailed analysis

  # Happy Path: View Ride Analytics
  Scenario: Analyze ride metrics and trends
    Given the admin is on "Analytics Dashboard"
    When the admin navigates to "Ride Analytics"
    Then the admin sees comprehensive ride metrics:
      | Metric                       | Value      | Trend    |
      | Total Rides                  | 12,450     | +8.3% WoW |
      | Completed Rides              | 12,205     | +8.1% WoW |
      | Cancelled Rides              | 168        | +3.6% WoW |
      | No-Show Rate                 | 1.2%       | -0.3% WoW |
      | Average Ride Duration        | 18.5 min   | Stable   |
      | Average Ride Distance        | 7.2 km     | +0.5% WoW |
      | Completion Rate              | 97.9%      | +0.2% WoW |
      | Average Rating (Customer)    | 4.75/5.0   | +0.05 WoW |
      | Average Rating (Driver)      | 4.68/5.0   | Stable   |
    And a time-series graph shows weekly trends
    And the admin can drill down by date, zone, vehicle type, or time of day
    And the admin can view hourly breakdown for a specific day

  # Happy Path: Generate Driver Performance Report
  Scenario: Review comprehensive driver analytics
    Given the admin is on "Analytics Dashboard"
    When the admin navigates to "Driver Performance Report"
    And the admin selects date range: "2026-03-01 to 2026-03-31"
    And the admin clicks "Generate Report"
    Then the system generates report showing top performers:
      | Rank | Driver Name | Rides | Earnings | Rating | Completion % |
      | 1    | John Smith  | 287   | $5,240   | 4.92   | 99.3%        |
      | 2    | Maria Garcia | 264  | $4,860   | 4.88   | 98.9%        |
      | 3    | Ali Hassan  | 251   | $4,720   | 4.87   | 99.1%        |
    And the report shows performance distribution across all drivers
    And a histogram shows ride distribution (how many drivers did X rides)
    And the admin can sort by rides, earnings, rating, or completion rate
    And the admin can click on any driver to view detailed profile and history
    And the report can be exported as CSV

  # Happy Path: Generate Customer Analytics Report
  Scenario: Review customer behavior and acquisition metrics
    Given the admin is on "Analytics Dashboard"
    When the admin navigates to "Customer Analytics"
    Then the admin sees customer metrics:
      | Metric                          | Value       |
      | Total Registered Customers      | 48,250      |
      | Active Customers (last 30 days) | 12,450      |
      | New Customers (this month)      | 2,340       |
      | Repeat Customer Rate            | 78.2%       |
      | Customer Churn Rate             | 3.2%        |
      | Average Customer Lifetime Value | $248.50     |
      | Average Rides per Customer      | 4.85        |
      | Average Revenue per Customer    | $18.50      |
    And a cohort analysis shows retention by signup month
    And a breakdown shows customer distribution by usage frequency
    And the admin can see geographic distribution of customers
    And the admin can identify high-value customer segments

  # Happy Path: Export Report to CSV
  Scenario: Export analytics report in CSV format
    Given the admin has generated "Driver Performance Report"
    When the admin clicks "Export as CSV"
    And the admin confirms export
    Then a CSV file is generated containing:
      | Column            | Content                    |
      | Report Title      | Driver Performance Report  |
      | Date Range        | 2026-03-01 to 2026-03-31  |
      | Generated By      | Admin name and timestamp   |
      | Data Rows         | All driver metrics         |
    And the file is downloaded to admin's computer
    And the admin can import into Excel, Google Sheets, or BI tools
    And the export includes all available metrics from the report

  # Happy Path: Export Report to PDF
  Scenario: Export analytics report in PDF format
    Given the admin has generated "Revenue Dashboard" report
    When the admin clicks "Export as PDF"
    And the admin selects options:
      | Option              | Selection        |
      | Include Charts      | Yes (color)      |
      | Include Drill-Down  | Summary only     |
      | Page Orientation    | Landscape        |
    And the admin confirms export
    Then a formatted PDF is generated with:
      | Element                | Format                    |
      | Report Header          | Title, date range, admin  |
      | Charts and Graphs      | Full color, optimized     |
      | Data Tables            | Professional formatting   |
      | Summary Statistics     | Highlighted key metrics   |
    And the PDF file is downloaded
    And the admin can share or print the PDF

  # Alternative Path: Create Custom Report
  Scenario: Build custom analytics report with selected metrics
    Given the admin is on "Analytics Dashboard"
    When the admin clicks "Create Custom Report"
    And the admin selects metrics:
      | Category                  | Selected Metrics            |
      | Revenue Metrics           | Gross Revenue, Commission   |
      | Ride Metrics              | Total Rides, Avg Ride Value |
      | Driver Metrics            | Active Drivers, Top Drivers |
      | Customer Metrics          | New Customers, Retention    |
      | Time Period               | Last 7 days                 |
      | Grouping (optional)       | By Zone and Vehicle Type    |
    And the admin clicks "Generate Custom Report"
    Then a custom report is generated with selected metrics
    And the report layout matches admin's preferences
    And the admin can save this report template for future use
    And a name/label is added: "Weekly Zone-Vehicle Analysis"
    And the report can be scheduled for automatic generation

  # Alternative Path: Schedule Automated Report
  Scenario: Set up recurring automated report delivery
    Given the admin wants weekly revenue reports
    When the admin navigates to "Scheduled Reports"
    And the admin clicks "Schedule Report"
    And the admin enters schedule details:
      | Field                 | Value              |
      | Report Type           | Revenue Dashboard  |
      | Frequency             | Weekly             |
      | Day of Week           | Monday             |
      | Time                  | 8:00 AM            |
      | Email Recipients      | admin@company.com  |
      | File Format           | PDF                |
      | Include Charts        | Yes                |
    And the admin clicks "Schedule"
    Then the report is scheduled to generate automatically
    And the first report is generated and sent on next Monday at 8 AM
    And the report is emailed to specified recipients
    And the admin can modify or cancel the schedule at any time
    And a log shows all past scheduled report sends

  # Alternative Path: Compare Metrics Across Periods
  Scenario: Compare current month to previous month metrics
    Given the admin is on "Revenue Dashboard"
    When the admin selects comparison mode: "Month-over-Month"
    And the admin selects current month: "April 2026" and previous month: "March 2026"
    And the admin clicks "Compare"
    Then the system displays side-by-side comparison:
      | Metric                | April 2026 | March 2026 | Change     |
      | Gross Revenue         | $856,400   | $789,200   | +8.5%      |
      | Platform Commission   | $128,460   | $118,380   | +8.5%      |
      | Total Rides           | 46,350     | 42,700     | +8.6%      |
      | Avg Ride Value        | $18.47     | $18.50     | -0.2%      |
    And a graph shows overlaid trends for visual comparison
    And the admin can drill down into categories showing largest changes
    And the comparison can be exported as report

  # Error Case: Cannot generate report without selecting date range
  Scenario: Attempt to generate report without date range
    Given the admin is creating custom report
    When the admin selects metrics but leaves date range blank
    And the admin clicks "Generate Report"
    Then the system displays error: "Date range is required"
    And the date range field is highlighted
    And the generate button is disabled until date range is selected

  # Error Case: Invalid date range (future end date)
  Scenario: Attempt to generate report with end date in future
    Given the admin is generating report
    When the admin enters date range:
      | Start Date | 2026-03-01 |
      | End Date   | 2026-05-01 |
    And the current date is 2026-04-03
    And the admin clicks "Generate Report"
    Then the system displays error: "End date cannot be in the future"
    And the end date field is highlighted
    And the system suggests using today's date (2026-04-03)

  # Error Case: Report generation timeout
  Scenario: Handle report generation failure for large data set
    Given the admin is generating annual report for all drivers and customers
    When the system begins processing large dataset
    And the processing takes longer than expected (> 5 minutes)
    Then the system displays message: "Report generation in progress..."
    And the admin is offered option to:
      | Option                          |
      | Wait for completion             |
      | Reduce date range and retry     |
      | Filter by zone or vehicle type  |
      | Receive report via email        |
    And if "Email" is selected, report is generated in background and emailed when complete

  # Edge Case: Compare report across different time zones
  Scenario: Generate report with timezone awareness
    Given the platform operates in multiple time zones
    When the admin navigates to "Revenue Dashboard"
    And the admin selects date range with timezone: "Pacific Time (PT)"
    And the admin generates report
    Then the report shows timestamps converted to PT
    And metrics are aggregated using PT dates
    And a note indicates timezone conversion applied
    And the admin can switch timezone to see same data in different timezone
    And historical data is correctly converted for comparison

  # Business rationale: Multi-timezone platforms need accurate time-based analytics


# Feature 8: Ride and Dispute Management
# ============================================================================
Feature: Ride and Dispute Management
  As an Admin
  I want to investigate ride issues and manage disputes
  So that I can maintain customer satisfaction and resolve conflicts fairly

  Background:
    # Foundational prerequisites for ride/dispute management
    Given the admin user is authenticated and authorized with "RIDE_DISPUTE_MANAGEMENT" permission
    And the admin user has "ADMIN", "SUPPORT", or "OPERATIONS" role
    And the system has ride records with dispute and complaint data
    And the system has driver and customer support interaction logs

  # Happy Path: Search Rides by Criteria
  Scenario: Find specific ride using search filters
    Given the admin is on "Ride Management" page
    When the admin clicks "Search Rides"
    And the admin enters search criteria:
      | Field              | Value                    |
      | Ride ID            | RIDE-98765 (or leave blank) |
      | Customer Name      | John Smith (or partial) |
      | Driver Name        | Maria Garcia (or partial) |
      | Date Range         | 2026-04-01 to 2026-04-03 |
      | Service Zone       | Downtown                 |
      | Vehicle Type       | Standard Sedan           |
      | Ride Status        | Completed                |
    And the admin clicks "Search"
    Then the system displays matching rides (example: 347 results)
    And the results table shows:
      | Column          | Value                |
      | Ride ID         | RIDE-98765          |
      | Customer        | John Smith          |
      | Driver          | Maria Garcia        |
      | Date/Time       | 2026-04-02 14:30    |
      | Pickup Location | Main St & 5th Ave   |
      | Destination     | Airport Terminal 2  |
      | Status          | Completed           |
      | Fare            | $42.50              |
    And the admin can sort by any column
    And the admin can click on any ride to view details

  # Happy Path: View Complete Ride Details
  Scenario: Inspect full ride history and details
    Given a ride with ID "RIDE-98765" is selected
    When the admin clicks on the ride to open details panel
    Then the admin sees comprehensive ride information:
      | Section                | Details                              |
      | Ride Summary           | ID, status, date/time, duration      |
      | Passenger Information  | Name, customer ID, rating, account   |
      | Driver Information     | Name, driver ID, rating, vehicle     |
      | Route Details          | Pickup address, destination, route   |
      | Fare Breakdown         | Base, distance, time, surge, total   |
      | Payment Method         | Card ending in, wallet, cash         |
      | Rating & Feedback      | Customer rating (1-5), comments      |
      | GPS Data               | Pickup location, drop-off location   |
      | Ride Timeline          | Booking, pickup, drop-off, completion |
    And the admin can view the actual route taken on a map
    And the admin can see any modifications or adjustments made
    And the admin can view communication between driver and passenger

  # Happy Path: Adjust Ride Fare
  Scenario: Manually adjust fare for completed ride
    Given ride "RIDE-98765" is completed with fare $42.50
    And the admin determines the route was suboptimal (added 2km)
    When the admin clicks "Adjust Fare"
    And the admin reviews current breakdown:
      | Component       | Amount |
      | Base Fare       | $5.00  |
      | Distance (8km)  | $12.00 |
      | Time (12 min)   | $3.60  |
      | Minimum Applied | $0     |
      | Surge (1.5x)    | ~$6.90 |
      | Total           | $42.50 |
    And the admin adjusts distance from 8km to 6.2km (corrected route)
    And new fare calculates to $38.20
    And the admin enters adjustment reason: "Route optimization error - overcharge by $4.30"
    And the admin confirms adjustment
    Then the ride fare is adjusted from $42.50 to $38.20
    And a refund of $4.30 is issued to the customer
    And the adjustment is logged with admin name, reason, and timestamp
    And the driver's commission is recalculated based on new fare
    And both customer and driver are notified of adjustment

  # Happy Path: Issue Refund for Ride
  Scenario: Issue full or partial refund for ride
    Given ride "RIDE-98765" is completed with fare $42.50
    And the customer filed complaint about driver behavior
    When the admin reviews the complaint and ride details
    And the admin determines refund is warranted
    And the admin clicks "Issue Refund"
    And the admin selects refund type: "Partial Refund"
    And the admin enters refund amount: "$21.25" (50% of fare)
    And the admin selects refund reason: "Customer complaint - driver behavior"
    And the admin enters notes: "Reviewed complaint, approved 50% refund for poor service"
    And the admin confirms refund
    Then the refund is processed immediately
    And the customer receives $21.25 refund to original payment method
    And the driver's earnings are adjusted (commission recalculated if needed)
    And the refund is recorded in ride history
    And both customer and driver are notified
    And the transaction is logged in audit trail

  # Happy Path: Investigate Safety Complaint
  Scenario: Review and investigate safety complaint
    Given a safety complaint has been filed on ride "RIDE-98765"
    When the admin navigates to "Dispute Management"
    And the admin filters by "Safety Complaints"
    And the admin selects complaint about ride "RIDE-98765"
    Then the admin sees complaint details:
      | Section              | Information                 |
      | Complaint Type       | Safety Concern - Aggressive Driver |
      | Ride Information     | Ride ID, date, driver, customer |
      | Complaint Details    | Customer's detailed description |
      | Evidence             | Customer submitted audio/video |
      | Filing Date/Time     | 2026-04-03 15:30            |
      | Status               | Under Investigation         |
    And the admin can review attached evidence (audio, video, images)
    And the admin can view driver's history (previous complaints)
    And the admin can view customer's account and history
    And the admin can view GPS route and timing data
    And the admin can add investigation notes
    And the admin can take action (suspend driver, issue refund, etc.)

  # Happy Path: Issue Dispute Resolution
  Scenario: Resolve dispute between driver and customer
    Given a dispute exists over fare amount
    And customer claims: "Driver used longer route than necessary"
    And driver claims: "Traffic required longer route, meter calculated correctly"
    When the admin navigates to "Dispute Management"
    And the admin selects the dispute
    And the admin reviews evidence:
      | Evidence Type    | Finding          |
      | GPS Route Map    | Route was optimal |
      | Traffic Data     | Heavy traffic justified route |
      | Meter Accuracy   | Verified correct |
      | Customer History | Previous disputes noted |
      | Driver History   | Clean record    |
    And the admin makes determination: "Dispute resolved in driver's favor"
    And the admin provides explanation: "GPS data confirms optimal route given traffic conditions"
    And the admin clicks "Resolve Dispute"
    Then the dispute status changes to "RESOLVED"
    And the resolution explanation is sent to both parties
    And the customer is offered option to appeal within 7 days
    And the resolution is logged with admin decision and rationale
    And no refund is issued in this case

  # Happy Path: View Ride Cancellation Details
  Scenario: Investigate ride cancellation
    Given a ride was cancelled before driver picked up customer
    When the admin searches for the cancelled ride
    And the admin clicks to view details
    Then the admin sees cancellation information:
      | Field                        | Value                    |
      | Cancellation Status          | Cancelled by Customer    |
      | Cancellation Time            | 2026-04-02 14:32         |
      | Time from Booking to Cancel  | 2 minutes                |
      | Driver Assigned              | Yes - DRV-08642          |
      | Driver Location at Cancel    | 0.8 km from pickup       |
      | Cancellation Fee Applied     | $2.50 (if applicable)    |
      | Reason Given by Customer     | Driver took wrong turn   |
      | Driver Comments              | GPS error, rerouting     |
    And the admin can determine if cancellation fee was appropriate
    And the admin can issue refund of cancellation fee if error occurred
    And the admin can review historical cancellation patterns for this customer/driver

  # Alternative Path: Create Manual Dispute
  Scenario: Admin-initiated dispute for quality issue
    Given the admin reviews fleet monitoring data
    And the admin notices driver "DRV-12345" completing unusually fast rides
    When the admin navigates to recent rides for this driver
    And the admin reviews ride "RIDE-98765" (14 km ride completed in 8 minutes at 105 mph average)
    And the admin determines this is unsafe/unrealistic
    And the admin clicks "Create Dispute"
    And the admin enters dispute details:
      | Field              | Value                        |
      | Dispute Type       | Safety Concern - Speeding    |
      | Ride ID            | RIDE-98765                   |
      | Issue Description  | Ride completed in suspiciously short time |
      | Expected Duration  | 18-22 minutes                |
      | Actual Duration    | 8 minutes                    |
      | Safety Concern     | Average speed 105 mph (unsafe) |
    And the admin initiates investigation
    Then an internal dispute is created
    And the driver is contacted for explanation
    And the GPS data is reviewed by safety team
    And if confirmed, appropriate action is taken (warning, suspension)

  # Alternative Path: Batch Process Similar Disputes
  Scenario: Handle multiple similar disputes efficiently
    Given 5 recent disputes about driver "DRV-12345" (similar pattern)
    When the admin navigates to "Dispute Management"
    And the admin filters by driver "DRV-12345"
    And the admin sees 5 similar disputes about route quality
    And the admin clicks "Batch Actions"
    And the admin selects disputes 1, 2, 3, 4, 5
    And the admin takes batch action: "Investigate Driver Pattern"
    And the admin enters investigation type: "Potential GPS/Navigation Issues"
    Then all disputes are grouped under single investigation
    And a consolidated report is generated
    And the driver is contacted for explanation on all patterns
    And if systemic issue confirmed, corrective action is recommended
    And all disputes are resolved together with single determination

  # Error Case: Cannot adjust fare for ride with pending dispute
  Scenario: Attempt to adjust fare while dispute is under investigation
    Given ride "RIDE-98765" has open safety dispute under investigation
    When the admin navigates to ride details
    And the admin clicks "Adjust Fare"
    Then the system displays error: "Cannot adjust fare - dispute under investigation"
    And the system shows dispute status and investigation details
    And the admin is prompted to "Resolve Dispute First" option
    And the fare adjustment option is greyed out

  # Error Case: Invalid refund amount
  Scenario: Attempt to issue refund exceeding ride fare
    Given ride "RIDE-98765" has fare $42.50
    When the admin clicks "Issue Refund"
    And the admin enters refund amount: "$50.00"
    And the admin clicks "Process Refund"
    Then the system displays error: "Refund amount ($50.00) exceeds ride fare ($42.50)"
    And the admin is prompted to enter valid amount (up to $42.50)
    And the process button remains disabled

  # Edge Case: Refund for promotional discount ride
  Scenario: Issue refund on ride with active promotion
    Given ride "RIDE-98765" has:
      | Component               | Amount |
      | Original Fare           | $42.50 |
      | Promotional Discount    | -$5.00 |
      | Final Fare Charged      | $37.50 |
    When the admin issues refund of $18.75 (50% refund)
    Then the system determines refund treatment:
      | Component               | Amount |
      | Refund (50% of original) | $21.25 |
      | Promotion Credit Refund | -$2.50 |
      | Net Refund to Customer  | $18.75 |
      | Promotion Adjustment    | Clawed back pro-rata |
    And the customer receives $18.75 refund
    And the promotion usage count is adjusted accordingly
    And the refund is logged with promotion impact noted

  # Edge Case: Dispute resolution creates precedent
  Scenario: Document precedent for future similar disputes
    Given dispute "DISPUTE-01234" has been resolved
    When the admin determines this sets precedent for similar cases
    And the admin clicks "Create Precedent"
    And the admin documents:
      | Field                  | Value              |
      | Issue Type             | Fare adjustment    |
      | Scenario               | Suboptimal routing |
      | Resolution Rule        | Refund 10% of fare |
      | Applicability          | Disputes type "routing error" |
      | Effective Date         | 2026-04-03        |
      | Review Date            | 2026-10-03        |
    And the admin saves precedent
    Then a precedent is created for future reference
    And support team can reference this precedent for similar cases
    And system flags future disputes matching criteria
    And precedent is reviewed quarterly for continued applicability


# Feature 9: Customer Management
# ============================================================================
Feature: Customer Management
  As an Admin
  I want to manage customer accounts and interactions
  So that I can maintain good customer relationships and enforce service policies

  Background:
    # Foundational prerequisites for customer management
    Given the admin user is authenticated and authorized with "CUSTOMER_MANAGEMENT" permission
    And the admin user has "ADMIN" or "SUPPORT" role
    And the system has customer account records with ride history
    And the system has customer communication logs and support tickets

  # Happy Path: View Customer Profile
  Scenario: Review comprehensive customer account information
    Given customer "CUST-45678" exists in the system
    When the admin searches for customer by name or ID
    And the admin clicks on the customer record
    Then the admin sees customer profile with sections:
      | Section                   | Information                    |
      | Personal Information      | Name, email, phone, location   |
      | Account Status            | Active, Verified, Account age |
      | Registered Payment Methods | Cards, wallets, saved methods |
      | Ride Statistics           | Total rides, avg rating, status |
      | Current Balance/Credits   | Wallet balance, active promos |
      | Account Preferences       | Language, notifications, privacy |
      | Support Interaction Count | Open tickets, past interactions |
    And the admin can edit certain fields (payment methods, preferences)
    And the admin can view account creation date and IP address
    And the admin can see login history (last 10 logins)

  # Happy Path: View Customer Ride History
  Scenario: Review complete ride history for customer
    Given customer "CUST-45678" is selected
    When the admin clicks "View Ride History"
    Then the admin sees ride list showing:
      | Column          | Data              |
      | Ride ID         | RIDE-12345        |
      | Date/Time       | 2026-04-02 14:30  |
      | Pickup Location | Main St & 5th Ave |
      | Destination     | Airport Terminal  |
      | Driver          | Maria Garcia      |
      | Vehicle Type    | Standard Sedan    |
      | Ride Status     | Completed         |
      | Fare Paid       | $42.50            |
      | Customer Rating | 5 stars           |
    And the list shows all rides (150+ possible)
    And the admin can filter by date range, status, or rating
    And the admin can sort by any column
    And the admin can click on any ride to view detailed information
    And the admin can view frequency analysis (rides per week/month)

  # Happy Path: Block Customer Account
  Scenario: Block customer account due to policy violation
    Given customer "CUST-45678" has multiple safety violations
    When the admin navigates to customer profile
    And the admin clicks "Block Customer"
    And the admin selects reason: "Repeated safety violations"
    And the admin enters duration: "Permanent" or "30 days"
    And the admin provides notes: "Multiple complaints from drivers regarding aggressive behavior"
    And the admin confirms block
    Then the customer account status changes to "BLOCKED"
    And the customer can no longer request rides
    And the customer receives notification with reason and appeal process
    And the customer can appeal within 7 days to support team
    And the block is logged with admin name, reason, and duration

  # Happy Path: Unblock Customer Account
  Scenario: Restore access to previously blocked customer
    Given customer "CUST-45678" is blocked for 30 days
    And the 30-day block period has elapsed
    When the admin reviews customer profile
    And the system automatically suggests unblocking
    And the admin clicks "Unblock Customer"
    And the admin confirms unblocking
    Then the customer account status changes from "BLOCKED" to "ACTIVE"
    And the customer can request rides again
    And a notification is sent to customer confirming restoration
    And the unblock action is logged in audit trail

  # Happy Path: View Customer Communication Log
  Scenario: Review all support interactions with customer
    Given customer "CUST-45678" is selected
    When the admin clicks "Communication Log"
    Then the admin sees all interactions:
      | Type           | Date/Time        | Topic          | Resolution    |
      | Support Ticket | 2026-04-01 10:30 | Ride cancellation | Refund issued |
      | In-App Message | 2026-03-30 14:15 | Rate question  | Answered      |
      | Support Ticket | 2026-03-28 09:00 | Driver complaint | Investigated  |
    And the admin can click on any interaction to view full details
    And the admin can see resolution status and notes
    And the admin can view message content
    And the admin can add follow-up notes or re-open tickets
    And the admin can search communication history by keyword

  # Alternative Path: Send Message to Customer
  Scenario: Send direct message to customer
    Given customer "CUST-45678" is selected
    When the admin clicks "Send Message"
    And the admin enters message:
      | Field          | Value                                |
      | Message Type   | Announcement                         |
      | Title          | Service Update                       |
      | Message Body   | We've updated our service areas... |
      | Send Method    | In-App Notification and Email       |
    And the admin clicks "Send Message"
    Then the message is delivered to customer
    And the customer receives in-app notification
    And the customer receives email notification (if opted-in)
    And the send is logged in communication history
    And the admin can track if customer viewed the message

  # Alternative Path: Review Customer Ratings and Feedback
  Scenario: Analyze customer feedback and rating patterns
    Given customer "CUST-45678" is selected
    When the admin navigates to "Ratings & Feedback" tab
    Then the admin sees analysis:
      | Metric                    | Value      |
      | Customer's Avg Rating     | 4.2/5.0    |
      | Total Ratings Given       | 47         |
      | 5-Star Ratings            | 28 (60%)   |
      | 1-2 Star Ratings          | 8 (17%)    |
      | Most Common Feedback      | Driver nice, car clean |
      | Negative Feedback Pattern | Wait times too long |
    And a breakdown shows 1-5 star distribution as bar chart
    And the admin can view actual feedback comments
    And the admin can identify common complaint themes
    And the admin can identify if customer is chronically dissatisfied

  # Error Case: Cannot block customer with pending refund
  Scenario: Attempt to block customer with active dispute
    Given customer "CUST-45678" has open dispute with pending refund decision
    When the admin navigates to customer profile
    And the admin clicks "Block Customer"
    Then the system displays warning: "Customer has active dispute pending resolution"
    And the system shows dispute details
    And the admin is prompted to "Resolve Dispute First"
    And the block action is prevented to avoid legal issues

  # Error Case: Invalid block duration
  Scenario: Attempt to block customer with invalid duration
    Given the admin is blocking customer account
    When the admin enters duration: "400 days"
    And the admin clicks "Block Customer"
    Then the system displays error: "Block duration must be between 1 and 365 days, or 'Permanent'"
    And the system suggests valid durations
    And the block button is disabled

  # Edge Case: High-value customer with policy violation
  Scenario: Handle policy violation by valuable customer
    Given customer "CUST-45678" has:
      | Metric               | Value    |
      | Total Rides          | 500+     |
      | Lifetime Value       | $8,500   |
      | Average Rating       | 4.8/5.0  |
      | Account Age          | 3 years  |
    When a safety violation is reported
    And the admin reviews the severity
    And the violation is confirmed (but first infraction)
    When the admin navigates to block options
    Then the system suggests graduated response:
      | Option                               | Rationale                |
      | Warning without restriction          | First offense for VIP    |
      | Temporary 7-day block with review    | Moderate escalation      |
      | Permanent block                      | Final option if repeated |
    And the admin can issue warning and require acknowledgment
    And if customer acknowledges and agrees to policy, account remains active
    And future violations are treated more severely

  # Business rationale: Balances compliance with customer lifetime value

  # Edge Case: Customer payment method expired
  Scenario: Notification when customer's payment method expires
    Given customer "CUST-45678" has registered card expiring 2026-04-30
    When the admin views customer profile
    And the current date is 2026-04-20
    And the card expiration is within 10 days
    Then the system displays warning on profile: "Payment method expires in 10 days"
    And the admin can send notification to customer to update payment
    And the customer is prompted in-app to update payment method
    And if payment method expires without update, future rides are declined


# Feature 10: System Configuration
# ============================================================================
Feature: System Configuration
  As an Admin
  I want to configure system-wide settings
  So that service operates according to business requirements

  Background:
    # Foundational prerequisites for system configuration
    Given the admin user is authenticated and authorized with "SYSTEM_CONFIGURATION" permission
    And the admin user has "ADMIN" role only
    And the system has defined service areas with geographic boundaries
    And the system has configurable operating parameters

  # Happy Path: Define Service Zones
  Scenario: Create new service zone
    Given the admin is on "System Configuration" page
    When the admin navigates to "Service Zones"
    And the admin clicks "Create New Zone"
    And the admin enters zone details:
      | Field                | Value                  |
      | Zone Name            | Airport District       |
      | Description          | Airport and surrounds  |
      | Geographic Boundary  | Draw polygon on map    |
      | Base Commission Rate | 20%                    |
      | Operating Status     | Active                 |
    And the admin draws zone boundary on map (5km radius)
    And the admin clicks "Save Zone"
    Then the new zone "Airport District" is created
    And the zone appears in zones list with map preview
    And drivers and customers can use this zone
    And zone-specific settings (fares, surge rules) can be configured
    And a success notification confirms zone creation

  # Happy Path: Set Operating Hours
  Scenario: Configure zone operating hours
    Given service zone "Downtown" is selected
    When the admin navigates to "Operating Hours" configuration
    And the admin enters operating hours:
      | Day of Week | Open Time | Close Time | Status   |
      | Monday      | 6:00 AM   | 1:00 AM    | Active   |
      | Tuesday     | 6:00 AM   | 1:00 AM    | Active   |
      | Wednesday   | 6:00 AM   | 1:00 AM    | Active   |
      | Thursday    | 6:00 AM   | 1:00 AM    | Active   |
      | Friday      | 6:00 AM   | 2:00 AM    | Active   |
      | Saturday    | 24 hours  | -          | Active   |
      | Sunday      | 6:00 AM   | 12:00 AM   | Active   |
    And the admin clicks "Save Operating Hours"
    Then the operating hours are configured
    And outside these hours, the zone shows "Service Unavailable"
    And customers cannot request rides outside operating hours
    And the system can automatically reopen at scheduled time
    And admin can manually override hours if needed (emergency, special event)

  # Happy Path: Configure Cancellation Policy
  Scenario: Set cancellation fee and policy
    Given the admin is on "System Configuration" page
    When the admin navigates to "Cancellation Policy"
    And the admin configures policy:
      | Setting                           | Value     |
      | Driver Cancellation Fee           | $3.00     |
      | Customer Cancellation Fee (driver on way) | $2.50 |
      | Customer Cancellation Fee (driver arriving) | $5.00 |
      | Time to Cancel Free (after booking) | 30 seconds |
      | Driver Free Cancellation Window   | 1 minute  |
    And the admin clicks "Save Policy"
    Then the cancellation policy is configured
    And the system applies fees according to policy
    And customers see cancellation fees in-app before confirming
    And drivers see cancellation fee policy
    And a grace period allows free cancellation within 30 seconds
    And the audit log records policy changes

  # Happy Path: Set Driver Search Radius
  Scenario: Configure search radius for driver matching
    Given the admin is on "System Configuration" page
    When the admin navigates to "Driver Matching Settings"
    And the admin configures search parameters:
      | Parameter                  | Value  |
      | Initial Search Radius      | 2 km   |
      | Maximum Search Radius      | 10 km  |
      | Radius Expansion Increment | 0.5 km |
      | Radius Expansion Interval  | 15 sec |
    And the admin clicks "Save Settings"
    Then the driver matching uses these parameters
    And system initially searches 2km radius for available drivers
    And every 15 seconds, radius expands by 0.5 km
    And search stops at 10 km maximum radius
    And if no driver found within 10km, ride is marked "No Drivers Available"
    And the settings affect matching speed and driver load balancing

  # Happy Path: Set Driver Search Timeout
  Scenario: Configure matching timeout
    Given the admin is on "System Configuration" page
    When the admin navigates to "Driver Matching Settings"
    And the admin sets:
      | Parameter             | Value  |
      | Driver Search Timeout | 60 seconds |
    And the admin clicks "Save Settings"
    Then the system searches for drivers for max 60 seconds
    And after 60 seconds, if no driver accepted, ride times out
    And customer is notified "No drivers available"
    And customer can retry or cancel
    And longer timeout = more search attempts but slower matching
    And shorter timeout = faster feedback but may miss available drivers

  # Happy Path: Configure Notification Templates
  Scenario: Create and manage notification templates
    Given the admin is on "System Configuration" page
    When the admin navigates to "Notification Templates"
    And the admin clicks "Create Template"
    And the admin enters template details:
      | Field          | Value                                |
      | Template Name  | Driver Arrived                       |
      | Trigger Event  | Driver within 100m of pickup         |
      | Notification Type | Push + SMS                        |
      | Message Text   | Driver {{driver_name}} has arrived. Vehicle: {{vehicle_details}} |
      | SMS Text       | Driver {{driver_name}} arrived       |
    And the admin includes variables: {{driver_name}}, {{vehicle_details}}
    And the admin clicks "Save Template"
    Then the notification template is created
    And the system uses this template for the trigger event
    And the system automatically fills variables with real data
    And the admin can create templates for all event types
    And templates can be A/B tested to optimize engagement

  # Happy Path: View System Health Metrics
  Scenario: Monitor system health and performance
    Given the admin is on "System Configuration" page
    When the admin navigates to "System Health"
    Then the admin sees real-time metrics:
      | Metric                  | Status       |
      | API Response Time       | 145 ms       |
      | Database Latency        | 35 ms        |
      | Payment Gateway Status  | Online       |
      | GPS Service Status      | Online       |
      | Notification Service    | Online       |
      | Email Service           | Online       |
      | System Uptime           | 99.98%       |
      | Active Concurrent Users | 2,450        |
      | Pending Rides Queue     | 15           |
    And each metric shows status (Green/Yellow/Red)
    And the admin can click on any metric to see history graph
    And alerts are triggered if any service goes down
    And the admin can configure alert thresholds

  # Alternative Path: Create Service Area Exclusion
  Scenario: Define area where service is temporarily unavailable
    Given the admin needs to exclude area due to emergency or construction
    When the admin navigates to "Service Zones"
    And the admin clicks "Create Exclusion Area"
    And the admin draws exclusion polygon on map
    And the admin enters details:
      | Field               | Value                  |
      | Exclusion Area Name | Construction Zone 5th  |
      | Reason              | Road construction      |
      | Start Date/Time     | 2026-04-10 9:00 AM    |
      | End Date/Time       | 2026-04-30 5:00 PM    |
      | Severity            | High - No service      |
    And the admin saves exclusion area
    Then rides cannot be requested from/to this area
    And customers see message "Service unavailable in this area until 2026-04-30"
    And drivers are notified to avoid area
    And at end date/time, exclusion is automatically removed
    And the system can send affected customers alternate service offers

  # Alternative Path: Schedule Maintenance Window
  Scenario: Schedule system maintenance with notification
    Given the admin needs to perform system maintenance
    When the admin navigates to "Maintenance & Downtime"
    And the admin clicks "Schedule Maintenance"
    And the admin enters maintenance details:
      | Field               | Value                |
      | Maintenance Type    | Database Optimization |
      | Expected Duration   | 30 minutes            |
      | Start Date/Time     | 2026-04-10 2:00 AM   |
      | End Date/Time       | 2026-04-10 2:30 AM   |
      | Customer Message    | Service may be slow   |
      | Driver Message      | Possible app delays   |
    And the admin schedules notifications: 24hr, 6hr, 1hr before
    And the admin clicks "Schedule"
    Then the maintenance window is scheduled
    And the system queues notifications at scheduled times
    And during maintenance, customers/drivers see message
    And ride requests may be paused or queued
    And the system resumes normal operation post-maintenance
    And a report shows downtime impact

  # Error Case: Cannot create overlapping service zones
  Scenario: Attempt to create zone with overlapping boundary
    Given service zone "Downtown" already exists
    When the admin creates new zone "Downtown East"
    And the admin draws boundary overlapping existing zone
    And the admin clicks "Save Zone"
    Then the system displays error: "Zone boundary overlaps with 'Downtown' zone"
    And the overlapping area is highlighted on map
    And the admin must adjust boundary to avoid overlap
    And the save button is disabled until conflict is resolved

  # Error Case: Invalid operating hours
  Scenario: Attempt to set invalid operating hours
    Given the admin is configuring zone operating hours
    When the admin enters:
      | Day       | Open Time | Close Time |
      | Monday    | 10:00 AM  | 8:00 AM    |
    And the admin clicks "Save"
    Then the system displays error: "Close time must be after open time"
    And both time fields are highlighted
    And the save button is disabled

  # Edge Case: Maintenance window during peak hours
  Scenario: Handle maintenance window notification during peak service
    Given peak hours are 5-7 PM
    When the admin schedules maintenance: 6:00 PM - 6:30 PM (peak hours)
    Then the system displays warning: "Scheduled maintenance overlaps peak hours (5-7 PM)"
    And the admin sees potential impact estimate:
      | Impact                    | Estimate     |
      | Expected Rides During Downtime | ~200 rides |
      | Revenue Impact            | ~$3,400      |
      | Customer Satisfaction Impact | High negative |
    And the admin can choose to:
      | Option                    |
      | Proceed despite warning   |
      | Reschedule to off-peak    |
      | Reduce maintenance scope  |

  # Business rationale: Prevents business-critical systems from being down during peak demand


# Feature 11: Admin User Management
# ============================================================================
Feature: Admin User Management
  As a Super Admin
  I want to manage admin user accounts and access control
  So that I can maintain security and proper authorization

  Background:
    # Foundational prerequisites for admin user management
    Given the admin user is authenticated and has "SUPER_ADMIN" role only
    And the system has role-based access control (RBAC) configured
    And the system has audit logging for all admin actions
    And super admin is the only role that can manage other admins

  # Happy Path: Create New Admin User Account
  Scenario: Create new admin account with specific role
    Given the super admin is on "Admin User Management" page
    When the super admin clicks "Create Admin User"
    And the super admin enters account details:
      | Field              | Value                  |
      | Full Name          | John Wilson            |
      | Email              | john.wilson@company.com |
      | Role               | OPERATIONS             |
      | Assigned Zones     | Downtown, Airport      |
      | Status             | Active                 |
      | Temporary Password | Generate random        |
    And the super admin clicks "Create Account"
    Then a new admin account is created
    And the user receives email with temporary password and setup link
    And the user must change password on first login
    And the account has permissions based on OPERATIONS role
    And the account is immediately available for use
    And audit log records account creation with super admin name

  # Happy Path: Assign Role-Based Permissions
  Scenario: Configure role permissions (SUPER_ADMIN)
    Given the super admin is managing roles
    When the super admin navigates to "Role Management"
    And the super admin selects role "OPERATIONS"
    Then the super admin sees permission assignments:
      | Permission                    | Assigned | Notes                |
      | Driver Management             | Yes      | Full access          |
      | Vehicle Fare Management       | Yes      | Create/update only   |
      | Fleet Monitoring              | Yes      | View only            |
      | Surge Pricing Configuration   | No       | Finance role only    |
      | Promotion Management          | No       | Finance role only    |
      | Commission Management         | No       | Finance role only    |
      | Analytics & Reporting         | Yes      | Zone-filtered view   |
      | Ride & Dispute Management     | Yes      | Full access          |
      | Customer Management           | Yes      | View & block only    |
      | System Configuration          | No       | Super admin only     |
      | Admin User Management         | No       | Super admin only     |
    And the super admin can toggle permissions on/off
    And the super admin can create custom roles with specific permissions
    And changes take effect immediately for all users with that role

  # Happy Path: View Admin Activity Audit Log
  Scenario: Review all admin actions in audit log
    Given the super admin is on "Audit Log" page
    When the super admin navigates to audit log
    Then the super admin sees entries for all admin actions:
      | Field              | Value                              |
      | Timestamp          | 2026-04-03 10:30:45                |
      | Admin Name         | John Wilson                        |
      | Admin Role         | OPERATIONS                         |
      | Action             | Driver Suspended                   |
      | Resource           | Driver DRV-12345                   |
      | Details            | Safety violation, 30-day suspension |
      | IP Address         | 192.168.1.100                      |
      | Status             | Success                            |
    And the log includes all admin actions (create, update, delete, suspend, etc.)
    And the log shows timestamp, admin, action, resource, and result
    And the super admin can filter by:
      | Filter Type | Options                |
      | Date Range  | Custom date range      |
      | Admin User  | Specific admin or all  |
      | Action Type | CRUD, suspensions, etc |
      | Resource    | Drivers, customers, etc |
    And the log can be exported as CSV or PDF
    And entries are immutable (cannot be deleted or edited)

  # Happy Path: Reset Admin Password
  Scenario: Reset password for admin account
    Given admin user "john.wilson@company.com" has forgotten password
    When the super admin navigates to admin user
    And the super admin clicks "Reset Password"
    And the super admin generates temporary password
    And the super admin sends reset link to admin email
    Then the admin receives email with reset link
    And the admin clicks link and sets new password
    And the admin can login with new password
    And the previous password is invalidated
    And the reset action is logged in audit trail

  # Happy Path: Revoke Admin Access
  Scenario: Immediately revoke admin access
    Given admin user "john.wilson@company.com" is departing company
    When the super admin navigates to admin user
    And the super admin clicks "Revoke Access"
    And the super admin confirms revocation
    Then the admin account is deactivated immediately
    And all active sessions for this admin are terminated
    And the admin cannot login anymore
    And any pending actions by this admin are logged
    And the account can be reactivated later if needed (recovery window)
    And the revocation is logged with super admin name and reason

  # Happy Path: Assign Admin to Specific Service Zones
  Scenario: Limit admin access to specific zones
    Given admin user "john.wilson@company.com" with OPERATIONS role
    When the super admin navigates to admin user
    And the super admin clicks "Edit Zone Assignment"
    And the super admin selects zones: "Downtown", "Airport" (unselect others)
    And the super admin clicks "Save"
    Then the admin can only view/manage data for Downtown and Airport
    And other zones are hidden from admin's view
    And zone filtering applies to all reports and searches
    And the admin cannot override zone restrictions
    And zone assignment is logged in audit trail

  # Happy Path: View Admin Login History
  Scenario: Review login history for admin user
    Given the super admin is reviewing admin user
    When the super admin clicks "Login History"
    Then the super admin sees recent logins:
      | Timestamp            | IP Address      | Device          | Status    |
      | 2026-04-03 10:30:45  | 192.168.1.100   | Chrome/Windows  | Success   |
      | 2026-04-02 14:20:12  | 192.168.1.100   | Chrome/Windows  | Success   |
      | 2026-04-01 09:15:33  | 192.168.1.101   | Firefox/MacOS   | Success   |
      | 2026-03-31 16:45:22  | 192.168.1.100   | Safari/iPad     | Success   |
      | 2026-03-31 16:40:01  | 192.168.0.50    | Unknown Device  | Failed    |
    And the super admin can see all login attempts (successful and failed)
    And suspicious login patterns can be identified (unusual IP, time, device)
    And the super admin can revoke access if unauthorized access suspected

  # Alternative Path: Create Custom Admin Role
  Scenario: Define new role with specific permissions
    Given the super admin wants specialized role for safety team
    When the super admin navigates to "Role Management"
    And the super admin clicks "Create Custom Role"
    And the super admin defines new role:
      | Field          | Value                |
      | Role Name      | SAFETY_SPECIALIST    |
      | Description    | Handles safety issues and complaints |
      | Permissions    | (check boxes):        |
      |                | View Safety Complaints |
      |                | Investigate Disputes   |
      |                | View Driver History    |
      |                | View GPS Data          |
      |                | Issue Warnings         |
      |                | Suspend Drivers (temp) |
      |                | NOT: Full suspension, NOT: Finance access |
    And the super admin clicks "Create Role"
    Then the new role "SAFETY_SPECIALIST" is created
    And admins can be assigned to this role
    And the role permissions are enforced across system
    And the role can be modified or deleted by super admin

  # Alternative Path: Enable Two-Factor Authentication (2FA) for Admin
  Scenario: Require 2FA for admin account
    Given the super admin wants to increase security
    When the super admin navigates to admin user "john.wilson@company.com"
    And the super admin clicks "Enable 2FA"
    And the super admin selects 2FA method: "Authenticator App" or "SMS"
    And the super admin sends activation link to admin email
    Then the admin receives setup instructions
    And the admin configures 2FA in their account
    And on next login, admin must provide 2FA code
    And login is denied without valid 2FA code
    And the super admin can see 2FA status for all admins
    And 2FA requirement can be enforced company-wide or per-admin

  # Error Case: Cannot create admin with same email
  Scenario: Attempt to create admin account with existing email
    Given admin user "john.wilson@company.com" already exists
    When the super admin creates new admin account
    And enters email: "john.wilson@company.com"
    And clicks "Create Account"
    Then the system displays error: "Email already in use - must be unique"
    And the email field is highlighted
    And the create button is disabled
    And the super admin is offered option to:
      | Option                          |
      | Use different email             |
      | Manage existing account instead |

  # Error Case: Cannot revoke own super admin access
  Scenario: Attempt to revoke own SUPER_ADMIN role
    Given the super admin is reviewing their own account
    When the super admin clicks "Revoke Access"
    Then the system displays error: "Cannot revoke own super admin access"
    And a note explains: "At least one super admin must remain active"
    And the revoke button is disabled
    And the system suggests transferring super admin to another user first

  # Error Case: Invalid role assignment
  Scenario: Attempt to assign permission beyond role capability
    Given the super admin is creating SUPPORT admin account
    When the super admin attempts to assign permission: "System Configuration"
    And clicks "Save"
    Then the system displays error: "Cannot assign System Configuration to SUPPORT role"
    And the system shows which roles can have this permission:
      | Role        |
      | SUPER_ADMIN |
    And the permission is unchecked and disabled for SUPPORT role

  # Edge Case: Admin account activity during suspension period
  Scenario: Admin attempts login while account temporarily suspended
    Given admin account is temporarily suspended (24-hour lock due to failed login attempts)
    When the admin attempts to login
    Then the system displays message: "Account temporarily locked - try again after 24 hours"
    And login fails
    And the super admin sees suspension in audit log
    And the super admin can manually unlock account if needed
    And the lock is automatically removed after 24 hours

  # Edge Case: Audit log for sensitive admin actions
  Scenario: Enhanced audit logging for sensitive operations
    Given a sensitive action is performed (create admin, revoke access, change role)
    When the super admin views "Sensitive Actions Log"
    Then the system shows all sensitive operations with:
      | Detail             | Example                     |
      | Action             | Admin Account Created       |
      | Timestamp          | 2026-04-03 10:30:45         |
      | Admin              | Sarah Chen (SUPER_ADMIN)    |
      | Affected User      | John Wilson (new OPERATIONS) |
      | Before State       | N/A (new account)           |
      | After State        | OPERATIONS role assigned    |
      | IP Address         | 192.168.1.100               |
      | Browser/Device     | Chrome on Windows 10        |
    And sensitive actions trigger notification to other super admins
    And a copy of sensitive audit log is emailed to super admin daily
    And sensitive logs are retained for 2 years (compliance requirement)

  # Business rationale: Enhanced logging for critical security and compliance operations
```

---

## Summary

I've created a comprehensive BDD Gherkin specification for **EPIC 3: ADMIN BACK OFFICE PORTAL** with all 11 features fully detailed:

1. **Driver Management** — Application review, approval/rejection, suspension, reactivation, deactivation
2. **Vehicle and Fare Management** — Vehicle type configuration, fare components, bulk updates, zone-specific and time-based pricing
3. **Real-Time Fleet Monitoring** — Live map, ride details, emergency flagging, manual dispatch
4. **Surge Pricing Configuration** — Utilization/time/zone-based rules, caps, performance analytics
5. **Promotion and Coupon Management** — Percentage/flat discounts, area/time restrictions, usage limits, analytics
6. **Commission Management** — Default rates, vehicle-type rates, new driver incentives, no commission on tips
7. **Analytics and Reporting** — Revenue/ride/driver/customer analytics, CSV/PDF export, custom reports
8. **Ride and Dispute Management** — Ride search, fare adjustment, refunds, safety investigations, dispute resolution
9. **Customer Management** — Profile views, ride history, blocking, communication logs
10. **System Configuration** — Service zones, operating hours, cancellation policy, driver matching, notification templates
11. **Admin User Management** — Account creation, role-based access, audit logging, 2FA

Each feature includes:
- Clear **Background** blocks with foundational prerequisites
- **Happy Path** scenarios for primary workflows
- **Alternative Path** scenarios for variations
- **Error Cases** with validation checks
- **Edge Cases** with complex scenarios
- **Business rationale** comments where needed
- Proper **Scenario Outline** use for data variations

All scenarios include explicit role and permission references in backgrounds to make security dependencies visible.


---

## 6. Scenario Dependency Map

This map shows how features and scenarios connect and depend on each other. It helps teams understand build order and which test failures might cascade.

```
FOUNDATIONAL LAYER (must be built first)
═══════════════════════════════════════════════════════════════════════

User Authentication (F1)
  ├── Customer Authentication (OTP, password, social)
  │    └── Wallet SDK Authentication (F11)
  │         └── Identity passthrough for embedded module
  ├── Driver Authentication (OTP, password)
  └── Admin Authentication (email/password, MFA)
       └── Role-Based Access Control (F3)
            └── Admin permission matrix

User Registration & Onboarding (F2)
  ├── Customer Registration → Profile Management → Payment Methods
  └── Driver Registration → Document Upload (F9) → Document Verification

Notification Infrastructure (F4)
  ├── Push notifications (ride updates, driver alerts)
  ├── SMS (OTP, ride confirmations)
  └── Email (receipts, document status, account alerts)

Geolocation Services (F5)
  ├── GPS tracking → Location resolution → Address display
  ├── Distance calculation → Fare estimation
  └── Geofencing → Zone-based pricing, Service area validation

Payment Infrastructure (F6)
  ├── Card payment processing → Receipts
  ├── Wallet balance processing → Receipts
  ├── Wallet partner API integration → Cross-system transactions
  ├── Cash payment tracking → Driver collection confirmation
  └── Refund processing → Fare adjustments

Real-Time Communication (F10)
  ├── WebSocket for live location updates
  ├── Ride status change broadcasting
  └── In-app chat messaging

File Upload & Storage (F9)
  └── Document upload → Image storage → Validation

Audit & Logging (F7)
  └── Admin action tracking → Activity audit log


EPIC 1: CUSTOMER APP (depends on: F1, F2, F4, F5, F6, F10, F11)
═══════════════════════════════════════════════════════════════════════

Customer Auth (F1) + Registration (F2)
  └── Customer Profile Management
       ├── Payment Method Management ──────────────────────┐
       └── Saved Locations ─────────────────────────────┐  │
                                                        │  │
Geolocation (F5) + Service Area Config (Admin) ─────┐  │  │
                                                    │  │  │
Ride Booking (On-Demand) ◄──────────────────────────┘──┘──┘
  │   Depends on: Auth, Payment, Geolocation, Service Areas
  │
  ├── Fare Estimation
  │     Depends on: Geolocation (distance), Fare Config (Admin), Surge Pricing (Admin)
  │
  ├── Driver Matching
  │     Depends on: Driver Online Status, Geolocation, Search Radius Config (Admin)
  │     Triggers: Ride Tracking, Driver Notification
  │
  ├── Ride Tracking (Real-Time) ◄── Real-Time Communication (F10)
  │     ├── Driver location updates
  │     ├── ETA calculation
  │     └── Share ride status
  │
  ├── Ride Cancellation
  │     Depends on: Cancellation Policy Config (Admin)
  │     Triggers: Payment (cancellation fee), Driver Notification
  │
  ├── Payment Processing ◄── Payment Infrastructure (F6)
  │     ├── Card payment
  │     ├── Wallet balance payment
  │     ├── Wallet API payment (embedded module)
  │     ├── Cash payment
  │     └── Tipping
  │     Triggers: Receipt Generation, Driver Earnings Update
  │
  ├── Rating & Feedback
  │     Depends on: Completed ride
  │     Triggers: Driver Performance Update, Admin Review (low ratings)
  │
  └── Promo Code Application
        Depends on: Promo Config (Admin)
        Triggers: Fare recalculation

Scheduled & Recurring Rides
  Depends on: Ride Booking, Notification Infrastructure
  Triggers: Automated booking creation, Reminder notifications

Ride History & Saved Locations
  Depends on: Completed rides, Payment records
  Triggers: Rebook flow (→ Ride Booking)

Delivery Service
  Depends on: Ride Booking (shares matching engine), Payment
  Triggers: Delivery tracking, Delivery confirmation

Ride Sharing (Pool)
  Depends on: Ride Booking, Geolocation (route matching)
  Triggers: Multi-rider matching, Route optimization, Split fare calculation


EPIC 2: DRIVER APP (depends on: F1, F2, F4, F5, F9, F10)
═══════════════════════════════════════════════════════════════════════

Driver Auth (F1) + Registration (F2)
  └── Document Upload (F9) → Document Verification (Admin)
       └── Account Approved
            └── Driver Online/Offline Toggle
                 │   Depends on: Valid documents, Approved account
                 │
                 ├── Ride Request Handling
                 │     Depends on: Online status, Geolocation
                 │     Triggers: Ride Execution Flow
                 │
                 ├── Ride Execution Flow
                 │     ├── Navigate to Pickup ◄── Geolocation (F5)
                 │     ├── Arrive at Pickup → Notify Customer (F4)
                 │     ├── Start Ride → Fare Meter
                 │     ├── Navigate to Destination ◄── Geolocation (F5)
                 │     └── Complete Ride → Payment Processing
                 │     Triggers: Earnings Update, Rating Request
                 │
                 ├── Driver-Customer Communication ◄── Real-Time Comm (F10)
                 │     ├── Masked phone call
                 │     ├── In-app chat
                 │     └── Quick message templates
                 │
                 └── Auto-offline on inactivity

Driver Earnings Dashboard
  Depends on: Completed rides, Commission Config (Admin)
  ├── Daily/weekly summaries
  ├── Per-ride breakdown
  └── Tip tracking

Payout Management
  Depends on: Earnings Dashboard, Bank Details
  ├── Weekly scheduled payout
  └── Instant payout (with fee)

Driver Performance Metrics
  Depends on: Ride history, Customer ratings
  Triggers: Performance warnings, Admin review

Driver Profile & Vehicle Management
  Depends on: Auth, Registration
  Triggers: Vehicle type eligibility, Document expiry alerts


EPIC 3: ADMIN BACK OFFICE (depends on: F1, F3, F4, F7)
═══════════════════════════════════════════════════════════════════════

Admin Auth (F1) + RBAC (F3)
  │
  ├── System Configuration (foundational for admin operations)
  │     ├── Service Areas/Zones → Used by: Ride Booking, Surge Pricing
  │     ├── Operating Hours → Used by: Ride Booking
  │     ├── Cancellation Policies → Used by: Ride Cancellation
  │     ├── Driver Search Config → Used by: Driver Matching
  │     └── Notification Templates → Used by: All notifications
  │
  ├── Driver Management
  │     ├── Application Review → Document Verification
  │     ├── Approve/Reject → Driver account status
  │     ├── Suspend/Reactivate → Driver availability
  │     └── Deactivate → Driver access removal
  │     Triggers: Driver App status changes, Notifications
  │
  ├── Vehicle & Fare Management
  │     ├── Vehicle Types → Used by: Customer vehicle selection
  │     └── Fare Structures → Used by: Fare estimation, Payment
  │
  ├── Real-Time Fleet Monitoring
  │     Depends on: Geolocation, Real-Time Communication
  │     ├── Live driver/ride map
  │     ├── Emergency handling
  │     └── Manual dispatch → Driver ride request
  │
  ├── Surge Pricing Configuration
  │     Depends on: Service Zones, Geolocation
  │     Triggers: Fare estimation updates, Customer surge display
  │
  ├── Promotion & Coupon Management
  │     Triggers: Customer promo validation, Fare discounts
  │
  ├── Commission Management
  │     Triggers: Driver earnings calculations, Payout amounts
  │
  ├── Ride & Dispute Management
  │     Depends on: Ride records, Payment records
  │     Triggers: Fare adjustments, Refunds, Driver actions
  │
  ├── Customer Management
  │     Depends on: Customer records, Ride history
  │     Triggers: Account blocks, Communication
  │
  ├── Analytics & Reporting
  │     Depends on: All operational data
  │     └── CSV Export
  │
  └── Admin User Management ◄── RBAC (F3)
        ├── Create admin accounts with roles
        ├── Permission management
        └── Activity audit log ◄── Audit & Logging (F7)
```

### Build Order Recommendation

Based on the dependency map, the recommended implementation order is:

1. **Sprint 1-2: Foundational Layer** — Auth (F1), Registration (F2), Notifications (F4), Geolocation (F5), Payment (F6), Real-Time Comm (F10), File Upload (F9), Audit (F7)
2. **Sprint 3-4: Admin System Config** — RBAC (F3), Service zones, Operating hours, Fare structures, Vehicle types, Cancellation policies
3. **Sprint 5-6: Driver Core** — Driver registration, Document upload/verification, Online/offline toggle, Ride request handling
4. **Sprint 7-8: Customer Core** — Ride booking, Fare estimation, Driver matching, Ride tracking, Payment processing
5. **Sprint 9-10: Ride Execution** — Ride flow (accept → navigate → pickup → ride → complete), Communication, Cancellation
6. **Sprint 11-12: Post-Ride & Monetization** — Rating, Earnings dashboard, Commission, Receipts, Ride history
7. **Sprint 13-14: Growth Features** — Promos, Scheduling, Recurring rides, Saved locations, Delivery, Pool
8. **Sprint 15-16: Admin Advanced** — Fleet monitoring, Surge pricing, Analytics, Dispute management, Customer management
9. **Sprint 17-18: Wallet Integration** — SDK layer (F11), Embedded module, Wallet payment API, Identity passthrough

---

## 7. Traceability Matrix

### Foundational Scenarios

| # | Scenario | Prerequisite | Job Story | Priority |
|---|----------|-------------|-----------|----------|
| F-1 | Customer registers with phone/OTP | F1, F2 | JS-C1 | Must |
| F-2 | Customer logs in with credentials | F1 | JS-C1 | Must |
| F-3 | Customer logs in via wallet app | F1, F11 | JS-C3 | Must |
| F-4 | Login fails with incorrect credentials | F1 | JS-C1 | Must |
| F-5 | Account locked after failed attempts | F1 | JS-C1 | Must |
| F-6 | OTP expires before entry | F1 | JS-C1 | Must |
| F-7 | Session token refresh | F8 | JS-C1, JS-D1 | Must |
| F-8 | Driver registers with phone/OTP | F1, F2 | JS-D4 | Must |
| F-9 | Driver logs in | F1 | JS-D1 | Must |
| F-10 | Driver session persists during shift | F1, F8 | JS-D1 | Must |
| F-11 | Driver single-device enforcement | F1 | JS-D1 | Must |
| F-12 | Super admin logs in | F1, F3 | JS-A1 | Must |
| F-13 | Role-based feature access | F3 | JS-A6 | Must |
| F-14 | Admin unauthorized access blocked | F3 | JS-A6 | Must |
| F-15 | Admin session timeout | F1, F8 | JS-A1 | Should |
| F-16 | Notification delivery by channel | F4 | All | Must |
| F-17 | Notification retry on failure | F4 | All | Must |
| F-18 | Wallet app notification delivery | F4, F11 | JS-C3 | Must |
| F-19 | GPS location resolution | F5 | JS-C1 | Must |
| F-20 | Distance and ETA calculation | F5 | JS-C1 | Must |
| F-21 | Low GPS accuracy handling | F5 | JS-C1 | Should |
| F-22 | Card payment processing | F6 | JS-C4 | Must |
| F-23 | Wallet API payment processing | F6, F11 | JS-C3 | Must |
| F-24 | Refund processing | F6 | JS-A5 | Must |
| F-25 | Payment gateway unavailable | F6 | JS-C4 | Must |
| F-26 | Wallet SDK initialization | F11 | JS-C3 | Must |
| F-27 | Wallet identity passthrough | F11 | JS-C3 | Must |
| F-28 | SDK auth failure | F11 | JS-C3 | Must |

### Customer App Scenarios

| # | Scenario | Business Rule | Job Story | Priority |
|---|----------|---------------|-----------|----------|
| C-1 | Book ride with fare estimate | R-C1, R-C2, R-C3 | JS-C1 | Must |
| C-2 | Book during surge pricing | R-C2 | JS-C1 | Must |
| C-3 | Book with manual pickup | R-C1 | JS-C1 | Must |
| C-4 | Book from wallet embedded module | R-C6 | JS-C3 | Must |
| C-5 | Book with multiple stops | R-C1 | JS-C1 | Should |
| C-6 | Unserviceable area | R-C1 | JS-C1 | Must |
| C-7 | No drivers available | R-C3 | JS-C1 | Must |
| C-8 | Driver timeout during matching | R-C3 | JS-C1 | Should |
| C-9 | Book without destination | R-C1 | JS-C1 | Must |
| C-10 | Track driver to pickup | — | JS-C1 | Must |
| C-11 | Track ride in progress | — | JS-C1 | Must |
| C-12 | Share ride status | — | JS-C1 | Could |
| C-13 | GPS signal lost | — | JS-C1 | Should |
| C-14 | Poor network tracking | — | JS-C1 | Should |
| C-15 | Cancel before driver accepts | R-C4 | JS-C1 | Must |
| C-16 | Cancel within free window | R-C4 | JS-C1 | Must |
| C-17 | Cancellation fees by stage | R-C4 | JS-C1 | Must |
| C-18 | Driver cancels ride | R-C4 | JS-C1 | Must |
| C-19 | Excessive cancellations warning | R-C4 | JS-C1 | Should |
| C-20 | Cancel completed ride | R-C4 | JS-C1 | Must |
| C-21 | Pay with card | R-C5, R-C7 | JS-C4 | Must |
| C-22 | Pay with wallet balance | R-C5 | JS-C4 | Must |
| C-23 | Pay via wallet API (embedded) | R-C5 | JS-C3 | Must |
| C-24 | Pay with cash | R-C5 | JS-C4 | Must |
| C-25 | Add tip after ride | R-C5 | JS-C4 | Should |
| C-26 | Card payment fails | R-C5 | JS-C4 | Must |
| C-27 | Insufficient wallet balance | R-C5 | JS-C4 | Must |
| C-28 | No payment method | R-C6 | JS-C4 | Must |
| C-29 | Schedule ride for later | R-C8 | JS-C2 | Must |
| C-30 | Set up recurring ride | R-C9 | JS-C5 | Should |
| C-31 | Cancel one recurring instance | R-C9 | JS-C5 | Should |
| C-32 | Edit recurring schedule | R-C9 | JS-C5 | Should |
| C-33 | Schedule too close | R-C8 | JS-C2 | Must |
| C-34 | No driver for scheduled ride | R-C8 | JS-C2 | Should |
| C-35 | Rate driver (happy path) | R-C10 | JS-C1 | Must |
| C-36 | Low rating with reason | R-C10 | JS-C1 | Must |
| C-37 | Skip rating | R-C10 | JS-C1 | Should |
| C-38 | Rate vehicle condition | R-C10 | JS-C1 | Could |
| C-39 | Rating window expires | R-C10 | JS-C1 | Could |
| C-40 | Apply valid promo | R-C11 | JS-C1 | Must |
| C-41 | Invalid promo scenarios (4 variants) | R-C11 | JS-C1 | Must |
| C-42 | Stack multiple promos | R-C11 | JS-C1 | Must |
| C-43 | View ride history | — | JS-C4 | Must |
| C-44 | View receipt | R-C7 | JS-C4 | Must |
| C-45 | Save favorite location | — | JS-C5 | Should |
| C-46 | Rebook previous ride | — | JS-C5 | Should |
| C-47 | Filter ride history | — | JS-C4 | Could |
| C-48 | Book delivery | — | JS-C6 | Should |
| C-49 | Track delivery | — | JS-C6 | Should |
| C-50 | Delivery completed | — | JS-C6 | Should |
| C-51 | Recipient unavailable | — | JS-C6 | Should |
| C-52 | Book pool ride | — | JS-C1 | Should |
| C-53 | Match multiple riders | — | JS-C1 | Should |
| C-54 | No pool match | — | JS-C1 | Should |
| C-55 | Pool rider cancels | — | JS-C1 | Should |
| C-56 | View vehicle types with pricing | — | JS-C1 | Must |
| C-57 | Select vehicle type | — | JS-C1 | Must |
| C-58 | Vehicle type unavailable | — | JS-C1 | Must |
| C-59 | Accessibility vehicle request | — | JS-C1 | Should |
| C-60 | Update profile | — | JS-C1 | Must |
| C-61 | Add payment method | R-C6 | JS-C4 | Must |
| C-62 | Manage saved addresses | — | JS-C5 | Should |
| C-63 | Notification preferences | — | JS-C1 | Should |
| C-64 | Card verification fails | R-C6 | JS-C4 | Must |
| C-65 | Account deletion | — | JS-C1 | Should |

### Driver App Scenarios

| # | Scenario | Business Rule | Job Story | Priority |
|---|----------|---------------|-----------|----------|
| D-1 | Go online | R-D1 | JS-D1 | Must |
| D-2 | Go offline | R-D1 | JS-D1 | Must |
| D-3 | Offline while on ride | R-D1 | JS-D1 | Must |
| D-4 | Auto-offline on inactivity | R-D1 | JS-D1 | Should |
| D-5 | Blocked from going online (expired docs) | R-D1, R-D7 | JS-D6 | Must |
| D-6 | Blocked from going online (suspended) | R-D1 | JS-D1 | Must |
| D-7 | Accept ride request | R-D2 | JS-D1 | Must |
| D-8 | Decline ride request | R-D2 | JS-D1 | Must |
| D-9 | Request timeout | R-D2 | JS-D1 | Must |
| D-10 | Warning on consecutive declines | R-D2 | JS-D1 | Should |
| D-11 | Navigate to pickup | R-D3 | JS-D2 | Must |
| D-12 | Arrive at pickup | R-D3 | JS-D2 | Must |
| D-13 | Start ride | R-D3 | JS-D2 | Must |
| D-14 | Complete ride | R-D3 | JS-D2 | Must |
| D-15 | Rider no-show | R-D3 | JS-D2 | Must |
| D-16 | Call customer (masked) | R-D4 | JS-D2 | Must |
| D-17 | In-app chat message | R-D4 | JS-D2 | Must |
| D-18 | Quick message template | R-D4 | JS-D2 | Could |
| D-19 | View daily earnings | R-D5 | JS-D3 | Must |
| D-20 | View weekly earnings | R-D5 | JS-D3 | Must |
| D-21 | Per-ride earnings breakdown | R-D5 | JS-D3 | Must |
| D-22 | Tip details (no commission) | R-D5 | JS-D3 | Must |
| D-23 | Weekly scheduled payout | R-D6 | JS-D3 | Must |
| D-24 | Instant payout with fee | R-D6 | JS-D5 | Should |
| D-25 | Payout failure | R-D6 | JS-D3 | Must |
| D-26 | Payout history | R-D6 | JS-D3 | Should |
| D-27 | Upload documents | R-D7 | JS-D4 | Must |
| D-28 | Documents approved | R-D7 | JS-D4 | Must |
| D-29 | Document rejected with reason | R-D7 | JS-D4 | Must |
| D-30 | Document expiry reminder | R-D7 | JS-D6 | Should |
| D-31 | Expired document blocks online | R-D7 | JS-D6 | Must |
| D-32 | View overall rating | — | JS-D3 | Must |
| D-33 | View acceptance rate | — | JS-D3 | Must |
| D-34 | Rating drops below threshold | — | JS-D3 | Should |
| D-35 | Turn-by-turn to pickup | — | JS-D2 | Must |
| D-36 | Turn-by-turn to destination | — | JS-D2 | Must |
| D-37 | Route recalculation | — | JS-D2 | Should |
| D-38 | Multiple stops navigation | — | JS-D2 | Should |
| D-39 | Update personal info | — | JS-D1 | Must |
| D-40 | Update bank details | — | JS-D5 | Must |
| D-41 | Register vehicle | — | JS-D4 | Must |
| D-42 | Update vehicle info | — | JS-D4 | Should |

### Admin Back Office Scenarios

| # | Scenario | Business Rule | Job Story | Priority |
|---|----------|---------------|-----------|----------|
| A-1 | Approve driver application | R-A1 | JS-A1 | Must |
| A-2 | Reject driver document | R-A1 | JS-A1 | Must |
| A-3 | Suspend driver | R-A1 | JS-A1 | Must |
| A-4 | Reactivate driver | R-A1 | JS-A1 | Must |
| A-5 | Deactivate driver | R-A1 | JS-A1 | Should |
| A-6 | View driver details/history | R-A1 | JS-A1 | Must |
| A-7 | Create vehicle type | R-A2 | JS-A6 | Must |
| A-8 | Update fare rates | R-A2 | JS-A6 | Must |
| A-9 | Disable vehicle type | R-A2 | JS-A6 | Should |
| A-10 | Configure fare components | R-A2 | JS-A6 | Must |
| A-11 | Bulk fare update | R-A2 | JS-A6 | Should |
| A-12 | Live fleet map | R-A3 | JS-A3 | Must |
| A-13 | View active ride details | R-A3 | JS-A3 | Must |
| A-14 | Emergency flag handling | R-A3 | JS-A5 | Must |
| A-15 | Manual dispatch | R-A3 | JS-A3 | Should |
| A-16 | Create surge pricing rule | R-A4 | JS-A2 | Must |
| A-17 | Surge auto-activation | R-A4 | JS-A2 | Must |
| A-18 | Disable surge for zone | R-A4 | JS-A2 | Must |
| A-19 | Maximum surge cap | R-A4 | JS-A2 | Should |
| A-20 | Create percentage promo | R-A5 | JS-A4 | Must |
| A-21 | Create flat-amount promo | R-A5 | JS-A4 | Must |
| A-22 | Area-restricted promo | R-A5 | JS-A4 | Should |
| A-23 | Time-restricted promo | R-A5 | JS-A4 | Should |
| A-24 | Usage limits (global + per-customer) | R-A5 | JS-A4 | Must |
| A-25 | Promo auto-deactivation | R-A5 | JS-A4 | Must |
| A-26 | Early promo deactivation | R-A5 | JS-A4 | Must |
| A-27 | Promo performance analytics | R-A5 | JS-A4 | Should |
| A-28 | Set default commission | — | JS-A3 | Must |
| A-29 | Commission per vehicle type | — | JS-A3 | Should |
| A-30 | Reduced commission for new drivers | — | JS-A3 | Could |
| A-31 | No commission on tips | — | JS-A3 | Must |
| A-32 | Commission reporting | — | JS-A3 | Should |
| A-33 | Revenue dashboard | R-A6 | JS-A3 | Must |
| A-34 | Ride analytics | R-A6 | JS-A3 | Must |
| A-35 | Driver performance report | R-A6 | JS-A3 | Must |
| A-36 | Customer analytics | R-A6 | JS-A3 | Should |
| A-37 | Export to CSV | R-A6 | JS-A3 | Should |
| A-38 | Search rides | — | JS-A5 | Must |
| A-39 | View ride details | — | JS-A5 | Must |
| A-40 | Fare adjustment/refund | — | JS-A5 | Must |
| A-41 | Investigate safety complaint | — | JS-A5 | Must |
| A-42 | Dispute resolution workflow | — | JS-A5 | Should |
| A-43 | View customer profiles | — | JS-A5 | Must |
| A-44 | Customer ride history | — | JS-A5 | Must |
| A-45 | Block/unblock customer | — | JS-A5 | Must |
| A-46 | Customer communication log | — | JS-A5 | Should |
| A-47 | Configure service areas/zones | R-A7 | JS-A6 | Must |
| A-48 | Set operating hours | R-A8 | JS-A6 | Must |
| A-49 | Configure cancellation policies | R-A9 | JS-A6 | Must |
| A-50 | Set driver search radius/timeout | R-A10 | JS-A6 | Must |
| A-51 | Notification templates | — | JS-A6 | Should |
| A-52 | Create admin accounts with roles | — | JS-A6 | Must |
| A-53 | Role-based access control | — | JS-A6 | Must |
| A-54 | Admin activity audit log | — | JS-A6 | Must |

---

## 8. Open Questions Summary

| # | Question | Epic | Impact |
|---|----------|------|--------|
| Q1 | What is the driver search radius and timeout per request? | Customer | Matching algorithm config |
| Q2 | Maximum number of concurrent bookings per customer? | Customer | UX and system load |
| Q3 | Can customers book for someone else (third-party booking)? | Customer | New feature scope |
| Q4 | Can customers split payment between methods? | Customer | Payment flow complexity |
| Q5 | How is tipping handled? In-app, cash, or both? | Customer/Driver | Payment and earnings |
| Q6 | Card payment failure recovery flow? | Customer | Payment UX |
| Q7 | Maximum advance scheduling window? | Customer | Scheduling constraints |
| Q8 | Can scheduled ride fares change (surge at ride time)? | Customer | Pricing expectations |
| Q9 | Cancellation policy for scheduled rides? | Customer | Fee structure |
| Q10 | Acceptance rate threshold before penalties? | Driver | Driver management |
| Q11 | Can drivers set preferred zones or destinations? | Driver | Driver feature scope |
| Q12 | Maximum wait time at pickup before driver can cancel? | Driver | Cancellation rules |
| Q13 | Commission structure: flat fee vs. percentage? | Driver/Admin | Financial model |
| Q14 | Are there driver bonuses (e.g., 20 rides = $50)? | Driver | Incentive scope |
| Q15 | Required documents per jurisdiction? | Driver | Onboarding config |
| Q16 | Multiple admin roles? What permissions per role? | Admin | RBAC complexity |
| Q17 | Dispute resolution workflow details? | Admin | Support process |
| Q18 | Multi-tenant views (operator sees only their data)? | Admin | Architecture |
| Q19 | Surge pricing: fully automatic or admin approval? | Admin | Surge workflow |
| Q20 | Analytics data retention period? | Admin | Storage, compliance |
| Q21 | Predefined reports or custom dashboards? | Admin | Analytics scope |
| Q22 | Can zones overlap? How are overlapping fares resolved? | Admin | Zone config |
| Q23 | Can operating hours vary by zone? | Admin | Scheduling config |
| Q24 | Cancellation policies configurable per vehicle type? | Admin | Policy granularity |

---

## 9. Quality Checklist

- [x] Foundational prerequisites identified (11 prerequisites: Auth, Registration, RBAC, Notifications, Geolocation, Payment, Audit, Session, File Upload, Real-Time, Wallet SDK)
- [x] Full BDD scenarios written for all foundational prerequisites
- [x] Every scenario traces to a business rule or job story (traceability matrix covers 28 foundational + 65 customer + 42 driver + 54 admin = **189 scenarios**)
- [x] Scenarios are interconnected — dependencies between features are explicit via Background blocks and the Scenario Dependency Map
- [x] Happy paths match stakeholder-described flows
- [x] Edge cases cover security, permissions, concurrency, payment failures, GPS loss, document expiry, no-shows
- [x] Business language used throughout (no implementation details in Gherkin)
- [x] One behavior per scenario (no multi-assert scenarios)
- [x] Background blocks explicitly reference foundational prerequisites
- [x] Scenario Outline with Examples tables used for data variations
- [x] Business rationale comments added where "why" isn't obvious
- [x] Scenario Dependency Map included with recommended build order
- [x] 24 open questions explicitly flagged for resolution
- [x] Traceability matrix complete with MoSCoW prioritization
- [x] Wallet app integration covered (embedded module, payment API, identity passthrough)
- [x] All 3 epics fully covered: Customer (12 features), Driver (10 features), Admin (11 features)
